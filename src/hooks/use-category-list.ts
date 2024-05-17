import { useStaticQuery, graphql } from "gatsby"

const useCategoryList = () => {

  const data = useStaticQuery(graphql`
    query CategoryQuery {
      allDirectory(
        filter: {base: {nin: ["images", "pages", "_POSTS"]}, absolutePath: {regex: "/^(?!.*[0-9]{8}_)/"}}
        sort: {absolutePath: ASC}
      ) {
        nodes {
          absolutePath
          base
        }
      }
      allMdx {
        totalCount
      }
    }
`);
 
  return data;
  // return {category: data.allDirectory, totalCount: data.allMdx.totalCount};
};

export default useCategoryList;

 