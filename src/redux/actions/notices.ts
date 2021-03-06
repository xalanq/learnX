import {ContentType, Notification} from 'thu-learn-lib-no-native/lib/types';
import {createAction, createAsyncAction} from 'typesafe-actions';
import {dataSource} from '../dataSource';
import {IThunkResult} from '../types/actions';
import {
  GET_ALL_NOTICES_FOR_COURSES_FAILURE,
  GET_ALL_NOTICES_FOR_COURSES_REQUEST,
  GET_ALL_NOTICES_FOR_COURSES_SUCCESS,
  GET_NOTICES_FOR_COURSE_FAILURE,
  GET_NOTICES_FOR_COURSE_REQUEST,
  GET_NOTICES_FOR_COURSE_SUCCESS,
  PIN_NOTICE,
  UNPIN_NOTICE,
  FAV_NOTICE,
  UNFAV_NOTICE,
} from '../types/constants';
import {INotice} from '../types/state';

export const getNoticesForCourseAction = createAsyncAction(
  GET_NOTICES_FOR_COURSE_REQUEST,
  GET_NOTICES_FOR_COURSE_SUCCESS,
  GET_NOTICES_FOR_COURSE_FAILURE,
)<undefined, {courseId: string; notices: INotice[]}, Error>();

export function getNoticesForCourse(courseId: string): IThunkResult {
  return async dispatch => {
    dispatch(getNoticesForCourseAction.request());

    const results = await dataSource.getNotificationList(courseId);

    if (results) {
      const notices = results.map(result => ({
        ...result,
        courseId,
        content: result.content
          ? result.content.startsWith('\xC2\x9E\xC3\xA9\x65')
            ? result.content.substr(5)
            : result.content.startsWith('\x9E\xE9\x65')
            ? result.content.substr(3)
            : result.content
          : '',
      }));
      dispatch(getNoticesForCourseAction.success({notices, courseId}));
    } else {
      dispatch(
        getNoticesForCourseAction.failure(
          new Error('getNoticesForCourse failed'),
        ),
      );
    }
  };
}

export const getAllNoticesForCoursesAction = createAsyncAction(
  GET_ALL_NOTICES_FOR_COURSES_REQUEST,
  GET_ALL_NOTICES_FOR_COURSES_SUCCESS,
  GET_ALL_NOTICES_FOR_COURSES_FAILURE,
)<undefined, INotice[], Error>();

export function getAllNoticesForCourses(courseIds: string[]): IThunkResult {
  return async dispatch => {
    dispatch(getAllNoticesForCoursesAction.request());

    const results = await dataSource.getAllContents(
      courseIds,
      ContentType.NOTIFICATION,
    );

    if (results) {
      const notices = Object.keys(results)
        .map(courseId => {
          const noticesForCourse = results[courseId] as Notification[];
          return noticesForCourse.map(notice => ({
            ...notice,
            courseId,
            content: notice.content
              ? notice.content.startsWith('\xC2\x9E\xC3\xA9\x65')
                ? notice.content.substr(5)
                : notice.content.startsWith('\x9E\xE9\x65')
                ? notice.content.substr(3)
                : notice.content
              : '',
          }));
        })
        .reduce((a, b) => a.concat(b));
      dispatch(getAllNoticesForCoursesAction.success(notices));
    } else {
      dispatch(
        getAllNoticesForCoursesAction.failure(
          new Error('getAllNoticesForCourses failed'),
        ),
      );
    }
  };
}

export const pinNotice = createAction(
  PIN_NOTICE,
  (noticeId: string) => noticeId,
)();

export const unpinNotice = createAction(
  UNPIN_NOTICE,
  (noticeId: string) => noticeId,
)();

export const favNotice = createAction(
  FAV_NOTICE,
  (noticeId: string) => noticeId,
)();

export const unfavNotice = createAction(
  UNFAV_NOTICE,
  (noticeId: string) => noticeId,
)();
