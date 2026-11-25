import { courses } from "./courses";
import type { Course } from "../types/course"; 

export function loadCourses():
Promise<Course[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(courses);
        }, 1000);
    });
}