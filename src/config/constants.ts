
/***************************************
 *  실제 사용하는 변수임
 ***************************************/
// import path from "path";
export const POSTS:string = process.env.POSTS!;
export const BASE_DOMAIN = process.env.BASE_DOMAIN!;
export const BLOG_NAME:string = process.env.BLOG_NAME!;
export const BLOG_DESC:string = process.env.BLOG_DESC!;
export const AUTHOR_NAME:string = process.env.AUTHOR_NAME!;
export const AUTHOR_SUMMARY:string = process.env.AUTHOR_SUMMARY!;
export const AUTHOR_SOCIAL_twitter:string = process.env.AUTHOR_SOCIAL_twitter!;
export const AUTHOR_SOCIAL_facebook:string = process.env.AUTHOR_SOCIAL_facebook!;
export const API_ENDPOINT:string = process.env.API_ENDPOINT!;

 
/******************************************* */
// 아래는 사용이 확정되지 않은 변수임
export const POSTS_PATH = `/${POSTS}`;
export const BLOG_THUMBNAIL_URL = `${BASE_DOMAIN}/blog_thumbnail.png`;
export const DESC_LENGTH = 120;
// export const SYS_POSTS_PATH = path.join(process.cwd(), POSTS_PATH);
export const REGEX = /\[(\d+)\]_/; // item.md 문서의 앞에있는 [xxx]_ 확인하는 정규식
 