import React from 'react';

export const MainLayout = ({header, content, footer}) => (
  <div>
      
      <div className="container">
        {content}
      </div>
      {footer}
  </div>
);