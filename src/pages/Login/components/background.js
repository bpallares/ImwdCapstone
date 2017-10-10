
import styled from 'styled-components'

const Background = styled.div`
  background-image: url('http://www.lindenwood.edu/files/callouts/j-scheidegger-center-night-1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display : flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:100vh;
  filter: blur(2px);  
  z-index:-1;
  position: fixed;

`

export default Background
