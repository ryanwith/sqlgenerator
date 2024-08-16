// executes if a google analytics tag is provided

export const initGoogleAnalytics = () => {
  // // Check if the script is already present and that the GTAG variable is defined
  // if (!window.gtag && process.env.REACT_APP_GOOGLE_TAG_ID) {
  //   const gtag_id = process.env.REACT_APP_GOOGLE_TAG_ID;
  //   // Create the script element
  //   const script = document.createElement('script');
  //   script.src = `https://www.googletagmanager.com/gtag/js?id=${gtag_id}`
  //   document.head.appendChild(script);

  //   // Initialize the gtag function
  //   script.onload = () => {
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){window.dataLayer.push(arguments);}
  //     window.gtag = gtag;
  //     gtag('js', new Date());
  //     gtag('config', gtag_id);
  //   };
  // }
};