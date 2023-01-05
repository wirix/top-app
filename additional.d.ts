import React from 'react';
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>; // not working 
  export default content;
}