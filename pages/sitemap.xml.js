const EXTERNAL_DATA_URL = 'https://annapapadopoulou.me/api';
// const EXTERNAL_DATA_URL = 'http://localhost:3000/api';

async function fetchSlugs(endpoint) {
    const response = await fetch(`${EXTERNAL_DATA_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  }
  
  function generateSiteMap(collabs, projects) {
    return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://annapapadopoulou.me</loc>
        </url>
        <url>
        <loc>https://annapapadopoulou.me/contanct</loc>
      </url>
      <url>
        <loc>https://annapapadopoulou.me/collaborations</loc>
      </url>
      <url>
        <loc>https://annapapadopoulou.me/collaborations</loc>
      </url>
        ${collabs
          .map(slug => {
            return `
          <url>
              <loc>https://annapapadopoulou.me/collaborations/${slug}</loc>
          </url>
        `;
          })
          .join('')}
        ${projects
          .map(slug => {
            return `
          <url>
              <loc>https://annapapadopoulou.me/projects/${slug}</loc>
          </url>
        `;
          })
          .join('')}
      </urlset>
    `;
  }
  
  export default function SiteMap() {
    // This function won't be used, but Next.js requires it to be present for getServerSideProps to work
  }
  
  export async function getServerSideProps({ res }) {
    const collabs = await fetchSlugs('/collab/getSlugs'); 
    const projects = await fetchSlugs('/project/getSlugs');  
  
    const sitemap = generateSiteMap(collabs, projects);
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  
    return {
      props: {},
    };
  }