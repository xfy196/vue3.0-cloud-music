import styled from "vue3-styled-components";
import globalStyle from "@/assets/global-style";
export const SingersContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.05rem 0.05rem;
  .cateScroll {
    display: flex;
    white-space: nowrap;
    align-items: center;
    .title {
      display: block;
      padding: 0.05rem 0;
      color: grey;
      font-size: 0.14rem;
      vertical-align: middle;
    }
    li {
      flex: 0 0 auto;
      font-size: 0.14rem;
      span {
        padding: 0.05rem 0.05rem;
        border-radius: 0.1rem;
        &.active {
          border: 1px solid ${globalStyle["theme-color"]};
          color: ${globalStyle["theme-color"]};
          opacity: 0.8;
        }
        &::before {
          border: none;
        }
      }
    }
  }
  .hotTypeScroll {
    width: ${(props) =>
      props.hotTypeScrollWidth === 0
        ? "auto"
        : `${props.hotTypeScrollWidth}px`};
  }
  .alphaTypeScroll {
    width: ${(props) =>
      props.alphaTypeScrollWidth === 0
        ? "auto"
        : `${props.alphaTypeScrollWidth}px`};
  }
  .singersListContainer {
    flex: 1;
    height: 100%;
    overflow: auto;
    .singerItem {
      display: flex;
      align-items: center;
      border-color: #e4e4e4;
      margin: 0.05rem;
      padding: 0.05rem 0;
      .singerPic {
        margin-right: 0.2rem;
      }
      .name {
        font-weight: 500;
        font-size: 0.14rem;
        color: #2e3030;
      }
    }
  }
  .van-loading {
    color: ${globalStyle["theme-color"]};
  }
  .van-loading__text {
    color: ${globalStyle["theme-color"]};
  }
  .van-pull-refresh__head {
    color: ${globalStyle["theme-color"]};
  }
  .van-list__finished-text {
    color: ${globalStyle["theme-color"]};
  }
  .loading {
    z-index: 10;
  }
`;
