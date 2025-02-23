import{r as o,a as j,d as x,s as B,j as s,L as w,e as y,c as A,u as C,b as L}from"./index-doGy3AvN.js";const b=({book:e})=>{const a="https://raw.githubusercontent.com/Kshitij-Bagal/Library-images/main/",c=`${a}link_to_image_.png`,[u,d]=o.useState(`${a}${encodeURIComponent(e.name)}.jpg`),[h,p]=o.useState(!1),m=j(),l=x(B).some(t=>t.id===e.id),i=()=>{h?d(c):(d(`${a}${encodeURIComponent(e.name)}.png`),p(!0))};if(!e)return s.jsx("div",{children:"Book data is missing!"});const v=async t=>{const n=t.name;if(!n){console.error("Book ID is missing:",t);return}try{await fetch(`https://library-backend-vi4b.onrender.com/api/books/${n}/increment-visit`,{method:"PATCH",headers:{"Content-Type":"application/json"}}),console.log(`Visit count increased for: ${t.name}`)}catch(g){console.error("Failed to update visit count:",g)}},r=()=>{l?(m(y(e.id)),console.log("Removed from favorites:",e.name)):(m(A(e)),console.log("Added to favorites:",e.name))};return s.jsxs("div",{className:"book-card",children:[s.jsx("img",{src:u,alt:e.name||"Book Cover",className:"book-cover",onError:i}),s.jsxs("div",{className:"book-info",children:[s.jsx("h3",{children:e.name||"Untitled"}),s.jsxs("p",{children:[s.jsx("strong",{children:"Author:"})," ",e.author||"Unknown"]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Genre:"})," ",e.genre||"Not specified"]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Published:"})," ",e.publishDate||"N/A"]}),s.jsx(w,{to:`/Library/book/${e.name}`,onClick:()=>v(e),className:"details-btn",children:"📖 View Details"}),s.jsx("button",{className:"fav-btn",onClick:r,children:l?"Remove from Favorites":"Add to Favorites"})]})]})},k=({books:e})=>!e||e.length===0?s.jsx("p",{children:"No books available."}):s.jsx("div",{className:"book-list",children:e.map(a=>s.jsx(b,{book:a},a.id))}),S=()=>{const[e,a]=o.useState(""),[c,u]=o.useState([]),[d,h]=o.useState([]),[p,m]=o.useState([]),[f,l]=o.useState(""),{genre:i}=C(),v=L();return o.useEffect(()=>{fetch("https://library-backend-vi4b.onrender.com/api/genres").then(t=>t.json()).then(t=>m(t)).catch(t=>console.error("Error fetching genres:",t)),(async()=>{try{const n=await(await fetch("https://library-backend-vi4b.onrender.com/api/books")).json();Array.isArray(n)?(u(n),h(n)):console.error("API returned invalid data:",n)}catch(t){console.error("Error fetching books:",t)}})()},[]),o.useEffect(()=>{if(!Array.isArray(c))return;let r=[...c];i&&(l(i),r=r.filter(t=>t.genre.toLowerCase()===i.toLowerCase())),e.trim()!==""&&(r=r.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.author.toLowerCase().includes(e.toLowerCase()))),h(r)},[e,c,i]),s.jsxs("div",{children:[s.jsx("h1",{children:"Browse Books"}),s.jsxs("div",{className:"filter",children:[s.jsx("input",{type:"text",placeholder:"Search by title or author",value:e,onChange:r=>a(r.target.value)}),s.jsxs("select",{value:f,onChange:r=>{l(r.target.value),v(`/browse-books/${r.target.value}`)},children:[s.jsx("option",{value:"",children:"All Genres"}),p.map(r=>s.jsx("option",{value:r.name.toLowerCase(),children:r.name},r.name))]})]}),s.jsx(k,{books:d})]})};export{S as default};
