
import React from "react";
import { CategoryDetail } from "../../config/types";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { navigate } from 'gatsby';
import useSidebarStore from "@/stores/store-sidebar";

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
}


const CategoryList = ({ categoryList, allPostCount, currentCategory }: CategoryListProps) => {
  // const currentPath = location.pathname;
  const { open, setOpen } = useSidebarStore();
  const currentPath = currentCategory ? decodeURIComponent(currentCategory) : "all";

  const handleMenuItemClick = (value: string) => {
    if (value === "all") {
      navigate("/category");
    } else if(value === "/") {
      navigate(`/`);
    } else {
      navigate(`/category/${value}`);
    }
    setOpen(false)
  };
 
  return (
    <nav className="sticky flex flex-col gap-3 top-28">
      <section className=" mb-10">
        <ul className="flex flex-col gap-3">
          {/* <CategoryButton href="/category" isCurrent={currentPath === "all"} displayName="All" count={allPostCount} /> */}

          <Sidebar width="100%" backgroundColor="transparent">
            <Menu
              menuItemStyles={{
                button: {
                  [`&:hover`]: {
                    backgroundColor: "#e1e1e1",
                  },
                  [`&.active`]: {
                    backgroundColor: "transparent",
                    color: "#b6c8d9",
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleMenuItemClick("/")}>All {allPostCount}</MenuItem>

              {Object.keys(categoryList).map((key: any) => {
                const item = categoryList[key];
                if (Object.keys(item).length === 0) {
                  const isActive = key === currentPath ? true : false;
                  return (
                    <MenuItem active={isActive} key={key} onClick={() => handleMenuItemClick(key)}>
                      {key}
                    </MenuItem>
                  );
                } else {
                  const isActive = currentPath.includes(key) ? true : false;
                  return (
                    <SubMenu
                      key={key}
                      label={key}
                      active={isActive}
                      defaultOpen={isActive}
                      rootStyles={{
                        div: {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {Object.keys(item).map((subKey: any) => {
                        const isActive = currentPath.includes(subKey) ? true : false;
                        return (
                          <MenuItem key={subKey} active={isActive} onClick={() => handleMenuItemClick(`${key}/${subKey}`)}>
                            {subKey}
                          </MenuItem>
                        );
                      })}
                    </SubMenu>
                  );
                }
              })}

            </Menu>
          </Sidebar>
        </ul>
      </section>
    </nav>
  );
};

export default CategoryList;
