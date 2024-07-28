export const slide = ({ i, PATH, FORMAT }) => `
  <li class="Slide">
    <img src="${PATH}${i}${FORMAT}" alt="${i} Image" />
  </li>
`;
