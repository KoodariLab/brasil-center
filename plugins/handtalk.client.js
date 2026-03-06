// plugins/handtalk.client.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    const script = document.createElement('script');
    script.src = "https://plugin.handtalk.me/web/latest/handtalk.min.js";
    script.onload = () => {
      setTimeout(() => {
        var ht = new HT({
          // token: '8dc04ec42f5c623a3c8d31dd6dbafeb2', // dev
          avatar: "MAYA",
          token: 'a034713c85171727eb56025b3a1e947d', // prod
        });
      }, 500);
    };
    document.body.appendChild(script);
  }
});