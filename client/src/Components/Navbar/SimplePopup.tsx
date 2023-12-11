import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div>
      <div aria-describedby={id}  onClick={handleClick}>
        <MonetizationOnIcon/>
      </div>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
            <form action="#" >
            <input type="number" placeholder='inter amount' className='addamount' min-value={1} required  />
            <button className='addamountbutton' type='submit'>done</button>
            </form>
            
        </PopupBody>
      </BasePopup>
    </div>
  );
}
const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: -140px;
  border-radius: 8px;
  background-color: black;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);