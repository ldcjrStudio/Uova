const spaceId = "a5p8ah7z3xg4";
const environmentId = "master";
const accessToken = "IiuJ_HSuHnEh8Q-0DVDZR0tUJ1nQKthIVPGa8RU2Ok0";

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`;
const sectionTag = document.querySelector("section.grid");

console.log(url);

const getData = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      //store assets
      const assets = data.includes.Asset;

      return data.items.map(item => {
        let imageUrl = "image1.jpg";

        const imageId = item.fields.image.sys.id;
        const imageData = assets.find(asset => {
          return asset.sys.id == imageId;
        });

        if (imageData) {
          imageUrl = imageData.fields.file.url;
          let appendHttp = "http:" + imageUrl;
          imageUrl = appendHttp;
        }

        item.fields.image = imageUrl;

        return item.fields;
      });
    });
};

getData().then(data => {
  console.log(data);

  sectionTag.innerHTML = "";

  data.forEach(item => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
    <div class="item">
    <img src="${item.image}"/>

        <div class="title">
            <h2>${item.title}</h2>
            <p>${item.price}</p>
        </div>
        <p>${item.description}</p>
    </div>
    `;
  });
});
