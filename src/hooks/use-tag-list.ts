import { useStaticQuery, graphql } from "gatsby"

const useTagList = (limit?:number) => {

  const limitNum:number = limit ? limit : 2000

  
  const data = useStaticQuery(graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx {
      group(field: {frontmatter: {taxonomy: {tag: SELECT}}}) {
        fieldValue
        totalCount
      }
    }
  }
`);

  const filteredTags = data.allMdx.group.filter((tag:any) => tag && !tag.fieldValue.includes("[@"));
  return {site: data.site, tags: filteredTags};
};

export default useTagList;

 
 // query ($id: String) {
//   mdx(id: {eq: $id}) {