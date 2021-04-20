import styled from "vue3-styled-components"
import globalStyle from "@/assets/global-style"
export const SearchContainerStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    .header{
        display: flex;
        align-items: center;
        background: ${globalStyle["theme-color"]};
        .searchInput{
            flex: 1;
            .van-search__action{
                color: #fff;
            }
        }
    }
`