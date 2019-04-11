import { createAsyncAction } from "typesafe-actions";
import dataSource from "../dataSource";
import { IThunkResult } from "../types/actions";
import {
  GET_COURSES_FOR_SEMESTER_FAILURE,
  GET_COURSES_FOR_SEMESTER_REQUEST,
  GET_COURSES_FOR_SEMESTER_SUCCESS
} from "../types/constants";
import { ICourse } from "../types/state";
import { login } from "./auth";
import { showToast } from "./toast";

export const getCoursesForSemesterAction = createAsyncAction(
  GET_COURSES_FOR_SEMESTER_REQUEST,
  GET_COURSES_FOR_SEMESTER_SUCCESS,
  GET_COURSES_FOR_SEMESTER_FAILURE
)<undefined, ReadonlyArray<ICourse>, Error>();

export function getCoursesForSemester(semesterId: string): IThunkResult {
  return async (dispatch, getState) => {
    dispatch(getCoursesForSemesterAction.request());

    const courses = await dataSource.getCourseList(semesterId).catch(err => {
      dispatch(showToast("刷新失败，您可能未登录", 1500));
      const auth = getState().auth;
      dispatch(login(auth.username || "", auth.password || ""));
    });

    if (courses) {
      dispatch(getCoursesForSemesterAction.success(courses));
    } else {
      dispatch(
        getCoursesForSemesterAction.failure(
          new Error("getCoursesForSemester failed")
        )
      );
    }
  };
}