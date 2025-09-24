// src/data/news.js

// Dữ liệu đầy đủ của các bài viết
const newsArticlesData = [
  {
    id: 1,
    title: "ASICLab Wins 'Best Research Paper' at ICAS 2025",
    summary: "Our team received top honors for their groundbreaking work on low-power SoC design at the International Conference on Advanced Semiconductors.",
    date: "September 24, 2025",
    image: "/images/news1.jpg",
    slug: "asiclab-wins-best-paper",
    content: "The ASICLab team presented their research titled 'A Novel Low-Power AIoT Chip for Edge Computing' at this year's ICAS conference. The paper was recognized for its innovative approach to reducing power consumption in AIoT devices, which is a critical step towards more sustainable and efficient technology. This achievement highlights the lab's commitment to pushing the boundaries of integrated circuit design and its impact on the industry.",
  },
  {
    id: 2,
    title: "New AIoT Research Project Launched with TechCorp",
    summary: "ASICLab is excited to announce a new collaboration with TechCorp to develop next-generation AIoT solutions for industrial applications.",
    date: "September 15, 2025",
    image: "/images/news2.jpg",
    slug: "aiot-project-launch",
    content: "In a major strategic partnership, ASICLab and TechCorp have officially launched a joint research project focused on creating cutting-edge AIoT platforms. This collaboration will leverage ASICLab's expertise in hardware design and TechCorp's strong position in the industrial sector. The project aims to integrate AI capabilities directly into IoT devices, leading to smarter, more autonomous industrial systems.",
  },
];

/**
 * Hàm giả lập việc gọi API để lấy danh sách bài viết.
 *
 * @param {string} url - URL của API (trong môi trường thực tế).
 * @param {string} type - Loại dữ liệu cần lấy ('summary' cho danh sách, 'full' cho bài viết chi tiết).
 * @param {string} slug - Slug của bài viết cần lấy (chỉ khi type là 'full').
 * @returns {Promise<Array | Object>} Dữ liệu bài viết.
 */
export const fetchNewsFromApi = async (url, type = 'summary', slug = '') => {
  // Mô phỏng độ trễ của mạng (1 giây)
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (type === 'full' && slug) {
    const article = newsArticlesData.find(a => a.slug === slug);
    return article || null;
  } else {
    // Trả về dữ liệu tóm tắt cho trang danh sách
    const summaryData = newsArticlesData.map(({ content, ...rest }) => rest);
    return summaryData;
  }
};