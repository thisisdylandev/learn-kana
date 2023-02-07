import dynamic from 'next/dynamic';
import React from 'react';
import { PropsWithChildren } from 'react';

const NonSSRWrapper = (props: PropsWithChildren) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
