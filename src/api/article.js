import axios from 'axios';
import { message } from 'ant-design-vue';
const baseURL = 'http://127.0.0.1:5000';

export const fetchArticle = async (articleId) => {
  try {
    const response = await axios.get(`${baseURL}/api/articles/${articleId}`);
    const article = response.data;
    if (article.image_path) {
      article.image_path = `${baseURL}/uploads/images/${article.image_path.split('/').pop()}`;
    }
    if (article.file_path) {
      article.file_path = `${baseURL}/uploads/files/${article.file_path.split('/').pop()}`;
    }
    return article;
  } catch (error) {
    message.error('Failed to fetch article');
    throw error;
  }
};

export const fetchArticles = async (articleSort = '') => {
  try {
    const url = articleSort ? `${baseURL}/api/articles/${articleSort}` : `${baseURL}/api/articles`;
    const response = await axios.get(url);
    const articles = response.data.map(article => {
      if (article.image_path) {
        article.image_path = `${baseURL}/uploads/images/${article.image_path.split('/').pop()}`;
      }
      if (article.file_path) {
        article.file_path = `${baseURL}/uploads/files/${article.file_path.split('/').pop()}`;
      }
      return article;
    });
    return articles;
  } catch (error) {
    message.error('无法获取文章');
    throw error;
  }
};

export const downloadArticle = async (articleId) => {
  try {
    const response = await axios.get(`${baseURL}/api/articles/${articleId}/download`, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${articleId}.docx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    message.error('Failed to download article');
    throw error;
  }
};

export const updateArticleViews = async (articleId, views) => {
  try {
    const response = await axios.put(`${baseURL}/api/articles/${articleId}/views`, { views });
    console.success('Views updated successfully!');
    return response.data;
  } catch (error) {
    console.error('Failed to update views');
    throw error;
  }
};

export const searchArticles = async (keyword) => {
  try {
    const response = await axios.get(`${baseURL}/api/articles/search`, {
      params: { keyword }
    });
    const articles = response.data.map(article => {
      if (article.image_path) {
        article.image_path = `${baseURL}/uploads/images/${article.image_path.split('/').pop()}`;
      }
      if (article.file_path) {
        article.file_path = `${baseURL}/uploads/files/${article.file_path.split('/').pop()}`;
      }
      return article;
    });
    return articles;
  } catch (error) {
    message.error('Failed to search articles');
    throw error;
  }
};
