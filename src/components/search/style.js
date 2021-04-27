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
    background: #fcfcfd;
    padding-bottom: ${(props) => props.playSwitch ? '0.6rem' : 0};
    .searchContainer {
        height: 100%;
        display: flex;
        flex-direction: column;
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
        .content {
            flex: 1;
            height: calc(100% - .54rem);
            .hotContainer{
                margin: 0 0.2rem 0.2rem 0.2rem;
                .headTitle {
                    font-size: 0.14rem;
                    color: #666;
                    padding-top: 0.35rem;
                    font-weight: normal;
                    margin-bottom: 0.1rem;
                }
                .hotList{
                    display: flex;
                    flex-wrap: wrap;
                    .hotItem {
                      display: inline-block;
                      padding: 0.1rem 0.15rem;
                      margin: 0 0.1rem 0.06rem 0;  
                      background: #fff;
                      font-size: 0.14rem;
                      color: #2E3030;
                      border-color: #d3d4da;
                      &::before{
                          border-radius: 0.8rem;
                      }
                    }
                }
            }
            .searchListWrapper{
                position: relative;
                .suggestBox {
                    .title{
                        margin: .1rem 0 .1rem .1rem;
                        color: #666;
                        font-size: .12rem;
                    }
                    .artistWrapper{
                        display: flex;
                        align-items: center;
                        margin: 0 .05rem 0;
                        padding: 0.05rem 0;
                        .name{
                            font-weight: 500;
                            font-size: .14rem;
                            color: #2E3030;
                            margin-left: 0.2rem;
                        }
                    }
                }
                .songList{
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding-left: 0.2rem;
                    .songItem {
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding: 0.05rem 0;
                        span {
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .songName{
                            font-size: .14rem;
                            color: #2E3030;
                        }
                        .songAuthor{
                            font-size: 0.12rem;
                            color: #bba8a8;
                        }
                    }
                }
            }
        }
    }
`