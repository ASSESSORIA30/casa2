import type { MetadataRoute } from 'next';
import { getHouseSlugs } from '@/data/houses';
const base='https://www.nombre-marca.es';
export default function sitemap(): MetadataRoute.Sitemap { const paths=['','/modelos','/todo-incluido','/como-funciona','/tecnologia','/equipamiento','/empresa','/contacto']; return [...paths.map((p)=>({url:`${base}${p}`,lastModified:new Date()})),...getHouseSlugs().map((s)=>({url:`${base}/modelos/${s}`,lastModified:new Date()}))]; }
