const paths = {
  back: <path d="m15 4-8 8 8 8" />,
  search: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6" /></>,
  share: <path d="M14 3v5C6 8 3 14 3 21c4-6 7-7 11-7v5l8-8Z" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  heart: <path d="M12 21 3 12C-3 5 6-2 12 5c6-7 15 0 9 7Z" />,
  star: <path d="m12 2 3.2 6.5 7.2 1-5.2 5.1 1.2 7.2-6.4-3.4-6.4 3.4 1.2-7.2-5.2-5.1 7.2-1Z" />,
  comment: <><path d="M3 17a10 10 0 1 1 5 4l-6 1Z" /><circle cx="8" cy="11" r=".6" /><circle cx="16" cy="11" r=".6" /></>,
  edit: <><path d="m4 16 12-12a2.1 2.1 0 0 1 3 3L7 19l-4 1ZM3 23h18" /></>,
  menu: <path d="M4 6h16M4 12h12M4 18h16" />,
  collection: <><path d="m2 8 10-6 10 6-10 6Z" fill="currentColor" stroke="none" /><path d="m2 14 10 6 10-6" /></>,
  speaker: <><path d="M3 9h5l6-5v16l-6-5H3Z" /><path d="M18 8q5 4 0 8" /></>,
  expand: <><path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7" /></>,
  camera: <><path d="M3 7h5l2-4h4l2 4h5v14H3Z" /><circle cx="12" cy="13" r="4" /></>,
  plus: <><circle cx="12" cy="12" r="10" /><path d="M6 12h12M12 6v12" /></>,
  voice: <><circle cx="12" cy="12" r="10" /><path d="M8 10q2 2 0 4M11 7q5 5 0 10M14 4q8 8 0 16" /></>,
  down: <path d="M12 3v18m-7-7 7 7 7-7" />,
  fullscreen: <><rect x="5" y="5" width="10" height="16" rx="2" /><path d="M10 8h1M18 3h4v4M18 9l4-6" /></>,
};
export default function Icon({ name, size = 24, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
