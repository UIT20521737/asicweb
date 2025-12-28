export default function RichTextContent({ content }) {
  return (
    <div 
      className="ql-editor text-base leading-relaxed text-slate-600 dark:text-slate-400
        [&_p]:mb-4 [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_img]:shadow-sm
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:scroll-mt-24
        [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 dark:[&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:scroll-mt-24
        
        /* FIX CHO DATA-LIST BULLET & ORDERED */
        [&_ul]:list-none [&_ul]:ml-0 [&_ul]:mb-4
        [&_ol]:list-none [&_ol]:ml-0 [&_ol]:mb-4 [counter-reset:list-counter]
        [&_li[data-list='bullet']]:relative [&_li[data-list='bullet']]:pl-6
        [&_li[data-list='bullet']]:before:content-['•'] [&_li[data-list='bullet']]:before:absolute [&_li[data-list='bullet']]:before:left-0 [&_li[data-list='bullet']]:before:text-emerald-500 [&_li[data-list='bullet']]:before:font-bold
        
        [&_li[data-list='ordered']]:relative [&_li[data-list='ordered']]:pl-6
        [&_li[data-list='ordered']]:counter-increment:list-counter
        [&_li[data-list='ordered']]:before:content-[counter(list-counter)'.'] [&_li[data-list='ordered']]:before:absolute [&_li[data-list='ordered']]:before:left-0 [&_li[data-list='ordered']]:before:text-emerald-600 [&_li[data-list='ordered']]:before:font-medium
        
        /* TABLE BORDER STYLES */
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_table]:border [&_table]:border-slate-200 dark:[&_table]:border-slate-800
        [&_td]:border [&_td]:border-slate-200 dark:[&_td]:border-slate-800 [&_td]:p-3 [&_td]:text-sm
        [&_th]:border [&_th]:border-slate-200 dark:[&_th]:border-slate-800 [&_th]:p-3 [&_th]:bg-slate-50 dark:[&_th]:bg-slate-900 [&_th]:text-sm [&_th]:font-bold
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}