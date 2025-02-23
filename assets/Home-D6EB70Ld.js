import{r as o,j as s,L as a}from"./index-DeQE5H57.js";const p=()=>{const[r,i]=o.useState([]),[n,c]=o.useState([]);o.useEffect(()=>{fetch("http://localhost:8000/api/genres").then(e=>e.json()).then(e=>i(e)).catch(e=>console.error("Error fetching genres:",e)),fetch("http://localhost:8000/api/popular-books").then(e=>{if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return e.json()}).then(e=>c(e)).catch(e=>console.error("Error fetching popular books:",e))},[]);const l=async e=>{const t=e.name;if(!t){console.error("Book ID is missing:",e);return}try{await fetch(`http://localhost:8000/api/books/${t}/increment-visit`,{method:"PATCH",headers:{"Content-Type":"application/json"}}),console.log(`Visit count increased for: ${e.name}`)}catch(h){console.error("Failed to update visit count:",h)}};return s.jsxs("div",{className:"home-container",children:[s.jsx("h1",{children:"Welcome to Our Online Library 📚"}),s.jsx("p",{children:"Discover a world of knowledge and entertainment. Explore our vast collection of books."}),s.jsxs("section",{className:"genres",children:[s.jsx("h2",{children:"Book Categories"}),r.length>0?s.jsx("ul",{children:r.map(e=>s.jsx("li",{children:s.jsxs(a,{to:`/Library/browse-books/${e.name.toLowerCase()}`,children:[e.name," (",e.count," books)"]})},e.name))}):s.jsx("p",{children:"Loading categories..."})]}),s.jsxs("section",{className:"popular-books",children:[s.jsx("h2",{children:"Popular Books 📖"}),n.length>0?s.jsx("ul",{children:n.map(e=>s.jsx("li",{className:"popular-book",children:s.jsxs(a,{onClick:()=>l(e),to:`/Library/book/${e.name}`,children:[s.jsx("img",{src:e.imageUrl,alt:e.name,className:"popular-book-cover"}),s.jsxs("div",{children:[s.jsx("h3",{children:e.name}),s.jsxs("p",{children:["by ",e.author]}),s.jsxs("p",{children:["👀 ",e.visitCount||0," visits • 📥 ",e.downloadCount||0," downloads"]})]})]})},e.id))}):s.jsx("p",{children:"Loading popular books..."})]})]})};export{p as default};
