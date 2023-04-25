import { createAction } from "@reduxjs/toolkit";

export const apiCallBegin = createAction("api/callBegin")
export const apiCallSuccess = createAction("api/callSuccess")
export const apiCallFailed = createAction("api/callFailed")