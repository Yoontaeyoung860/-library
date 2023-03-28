import React, { useEffect } from 'react';
import { message as messageDialog, PageHeader, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FormOutlined } from '@ant-design/icons';

import Layout from './Layout';
import { BookReqType, BookResType } from '../types';
import styles from './Edit.module.css';

interface EditProps {
  book: BookResType | undefined | null;
  loading: boolean;
  error: Error | null;
  edit: (book: BookReqType) => void;
  back: () => void;
  getBooks: () => void;
  logout: () => void;
}

const Edit: React.FC<EditProps> = ({
  book,
  loading,
  error,
  edit,
  getBooks,
  back,
  logout,
}) => {
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [url, setUrl] = React.useState("");   


  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  if (book === null) {
    return null;
  }

  if (book === undefined) {
    return (
      <div>
        <h1>NotFound Book</h1>
      </div>
    );
  }

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <FormOutlined /> Edit Book
          </div>
        }
        subTitle="Edit Your Book"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button_logout}
          >
            Logout
          </Button>,
        ]}
      />

      <img src="/bg_list.png" className={styles.bg} alt="books" />

      <div className={styles.edit}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={book?.title || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.input_comment}>
          Comment
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <TextArea
            rows={4}
            placeholder="Comment"
            onChange={(e) => setMessage(e.target.value)}
            defaultValue={book?.message || ''}
            className={styles.input}
            style={{ minHeight: 100 }}
          />
        </div>
        <div className={styles.input_author}>Author</div>
        <div className={styles.input_area}>
          <Input
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
            defaultValue={book?.author || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.input_url}>URL</div>
        <div className={styles.input_area}>
          <Input
            placeholder="URL"
            onChange={(e) => setUrl(e.target.value)}
            defaultValue={book?.url || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={click}
            className={styles.button}
          >
            Update
          </Button>
        </div>
      </div>
    </Layout>
  );

  function click() {
    if (title === "" || message === "" || author === "" || url === "") {
      messageDialog.error('Please fill out all inputs');
      return;
    }
    edit({
      title,
      message,
      author,
      url,
    });
  }
};
export default Edit;
