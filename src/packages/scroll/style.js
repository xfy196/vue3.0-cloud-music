import styled from "vue3-styled-components"
export const ScrollContainer = styled.div`
height: 100%;
#scrollWrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .loading{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 10
    }
}
`
