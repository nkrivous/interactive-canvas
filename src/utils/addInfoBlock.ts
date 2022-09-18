export function addAInfoBlock(id: string, heading: string) {
  const article = document.createElement("article");
  article.id = id;
  article.setAttribute("style", "background-color: white; padding: 10px;");

  const header = document.createElement("h2");
  header.innerText = heading;
  article.appendChild(header);

  const body = document.createElement("p");
  body.className = "articleBody";
  article.appendChild(body);

  return article;
}
