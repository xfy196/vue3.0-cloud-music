import styled from "vue3-styled-components";
import needle from "./needle.png";
import disc from "./disc.png";
import globalStyle from "@/assets/global-style";
export const NormalPlayerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f2f3f4;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    filter: blur(20px);
    opacity: 0.6;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .background.layer {
    background: #2e3030;
    opacity: 0.3;
    filter: none;
  }
`;
export const HeaderStyled = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgba(228, 228, 228, 0.1);
  box-sizing: border-box;
  .arrow {
    margin-left: 0.05rem;
    i {
      padding: 9px;
      color: #2e3030;
    }
  }
  .title,
  .subTitle {
    line-height: 0.25rem;
    font-size: 0.16rem;
    color: #2e3030;
    ${globalStyle["nowrap"]}
  }
`;
export const LayerContainer = styled.div`
  position: fixed;
  top: 8%;
  width: 100%;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
  bottom: 170px;
  .layerRef {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .cdWrapper {
    margin: auto;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .needle {
      position: absolute;
      top: -6.67vw;
      left: 48vw;
      width: 25vw;
      height: 40vw;
      z-index: 100;
      background-image: url(${needle});
      background-position: 50%;
      background-size: contain;
      background-repeat: no-repeat;
      transition: all 0.3s;
      transform: rotate(0deg);
      transform-origin: 4.5vw 4.5vw;
    }
    .needle.pause {
      transform: rotate(-30deg);
    }
    .cd {
      top: 16%;
      position: absolute;
      width: 70%;
      height: 70vw;
      background-image: url(${disc});
      border: 4px solid rgba(228, 228, 228, 0.1);
      border-radius: 50%;
      background-position: 50%;
      background-size: contain;
      background-repeat: no-repeat;
      .image {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 68%;
        height: 68%;
        margin: auto;
        border-radius: 50%;
      }
      .play {
        animation: rotate 10s infinite;
      }
      .pause {
        animation-play-state: paused;
      }
    }
    .playing_lyric {
      position: absolute;
      margin: auto;
      width: 80%;
      top: 95vw;
      font-size: 0.14rem;
      line-height: 0.2rem;
      white-space: normal;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .layerBox {
    font-size: 24px;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
`;
export const List = styled.ul`
  display: flex;
  justify-content: center;
  span {
    flex: 0 0 auto;
    font-size: 0.14rem;
    padding: 5px 5px;
    border-radius: 10px;
    color: #bba8a8;
  }
`;
export const ListItem = styled.div`
  flex: 0 0 auto;
  font-size: 0.14rem;
  padding: 5px 5px;
  border-radius: 10px;
  color: #bba8a8;
  ${({ selected }) =>
    selected
      ? {
          color: `var(--THEME)`,
          border: `1px solid var(--THEME)`,
          opacity: `0.8`,
        }
      : {}}
`;
