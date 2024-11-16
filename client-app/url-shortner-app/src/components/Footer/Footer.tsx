import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return(
    <div className="bg-blue-950 text-yellow-50 text-base text-center py-5">
        Copyright &#169; URLShortner | Hansika Thathsarani
    </div>
  );
};

export default Footer;
