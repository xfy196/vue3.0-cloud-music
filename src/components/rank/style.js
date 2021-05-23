import styled from "vue3-styled-components";

export const RankContainerStyled = styled.div`
  overflow: auto;
  height: 100%;
  flex: 1;
  position: relative;
  .van-loading{
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  .img_wrapper {
    width: 1rem;
    height: 1rem;
    position: relative;
    overflow: hidden;
    .update_frequecy {
      position: absolute;
      left: 0.07rem;
      bottom: 0.07rem;
      font-size: 0.1rem;
      color: #f1f1f1;
    }
  }
  .officialList {
    padding: 0 0.05rem;
    .officialItem {
      display: flex;
      padding: 0.03rem 0;
      align-items: center;
      &::before {
        border-color: #e4e4e4;
      }
      margin-top: 0.1rem;

      .songList {
        flex: 1;
        display: flex;
        padding: 0.1rem;
        justify-content: space-around;
        flex-direction: column;
        height: 1rem;
        .songItem {
          font-size: 0.12rem;
          color: gray;
        }
      }
    }
  }
  .globalList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.05rem;
    justify-content: space-between;
    &:after{
        content: "";
        display: block;
        width: 1.2rem;
    }
    .globalItem {
      padding: 0.03rem 0;
      box-sizing: border-box;
      &::before {
        border-color: #e4e4e4;
      }
      .img_wrapper {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
`;
