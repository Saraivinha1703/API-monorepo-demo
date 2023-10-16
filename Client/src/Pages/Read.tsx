import { useEffect, useState, useRef } from 'react';
import { Table } from '../Components/Table';
import axios from 'axios';
import { AuthorsAndBooksModel } from '../Models/AuthorsAndBooks';
import { BooksAndAuthorsModel } from '../Models/BooksAndAuthors';
import { BooksOnlyModel } from '../Models/BooksOnly';
import { AuthorOnlyModel } from '../Models/AuthorOnly';
import { CustomFooter } from '../Components/CustomFooter';

type VariantType =
  | AuthorsAndBooksModel
  | BooksAndAuthorsModel
  | BooksOnlyModel
  | AuthorOnlyModel;

const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/g;

export function Read() {
  const [endpoint, setEndpoint] = useState('api/getBooksAndAuthors');
  const [data, setData] = useState<VariantType[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const modalContent = useRef<BooksOnlyModel[] | AuthorOnlyModel>();

  useEffect(() => {
    axios.get(endpoint).then(res => setData(res.data));
  }, [endpoint]);

  function toggleModal(
    open: boolean,
    obj?: BooksOnlyModel[] | AuthorOnlyModel
  ) {
    setModalVisible(open);
    modalContent.current = obj;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mt-8 items-center justify-center flex-col">
        <p className="font-semibold my-2 text-xl text-pastelGreen-600 px-7">
          Select the data that you want to search
        </p>
        <select
          className="shadow shadow-black/30 w-1/3 h-8 rounded-xl bg-pastelGreen-300"
          onChange={e => setEndpoint(e.target.value)}
          defaultValue={'api/getBooksAndAuthors'}
        >
          <option disabled className="text-white text-center font-semibold">
            Books Options
          </option>
          <option value="api/getBooksAndAuthors">
            Get All Books And Authors
          </option>
          <option value="api/getBooks">Get All Books</option>
          <option disabled className="text-white text-center font-semibold">
            Authors Options
          </option>
          <option value="api/getAuthorsAndBooks">
            Get All Authors And Books
          </option>
          <option value="api/getAuthors">Get All Authors</option>
        </select>
      </div>

      <dialog
        open={modalVisible}
        className="absolute top-0 w-full h-full items-center justify-center bg-black/40"
      >
        <div className="flex items-center justify-center my-16">
          <div className="flex flex-col items-center justify-center w-1/2 p-4 bg-white rounded-xl max-h-[570px] overflow-scroll scrollbar-hide shadow-xl shadow-black/30">
            {Array.isArray(modalContent.current) ? (
              <Table.Root>
                <Table.Header>
                  <Table.Cell text="Id" />
                  <Table.Cell text="Name" />
                  <Table.Cell text="Price" />
                  <Table.Cell text="Rating" />
                  <Table.Cell text="Created Date" />
                </Table.Header>
                {modalContent.current.map(books => {
                  return (
                    <Table.Row>
                      <Table.Cell text={books.id.toString()} />
                      <Table.Cell text={books.name} />
                      <Table.Cell text={books.price.toString()} />
                      <Table.Cell text={books.rating.toString()} />
                      <Table.Cell
                        text={books.createdDate.toString().split('T')[0]}
                      />
                    </Table.Row>
                  );
                })}
              </Table.Root>
            ) : typeof modalContent.current === 'object' ? (
              Object.entries(modalContent.current).map(([key, val]) => {
                return (
                  <div className="flex justify-start w-full text-center">
                    <p className="mb-2 text-pastelGreen-500 font-semibold mr-6">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </p>
                    <p>{val}</p>
                  </div>
                );
              })
            ) : (
              ''
            )}
            <button
              className="bg-gradient-to-r from-red-300 to-red-600 py-1.5 px-3 mt-4 text-white font-semibold text-lg rounded-lg shadow-lg shadow-red-500/50 duration-150 hover:py-2 hover:px-4 hover:bg-gradient-to-br"
              onClick={() => toggleModal(false)}
            >
              <p>Close</p>
            </button>
          </div>
        </div>
      </dialog>

      <div className="w-full h-full flex flex-col items-center justify-between">
        <Table.Root className="my-10">
          <Table.Header>
            {data[0] !== undefined
              ? Object.entries(data[0]).map(([key]) => (
                  <Table.Cell
                    text={
                      key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, ' $1')
                        .trim()
                    }
                  />
                ))
              : null}
          </Table.Header>
          {data.map(value => {
            if (value !== undefined)
              return (
                <Table.Row>
                  {Object.values(value).map(val => {
                    return (
                      <Table.Cell
                        text={
                          typeof val !== 'object' ? (
                            dateRegex.test(val) ? (
                              val.toString().split('T')[0]
                            ) : (
                              val
                            )
                          ) : (
                            <button
                              className="py-1.5 px-3 rounded-lg shadow-lg shadow-pastelGreen-500/50 bg-gradient-to-r from-pastelGreen-300 to-pastelGreen-500 duration-150 hover:bg-gradient-to-br hover:py-2 hover:px-4"
                              onClick={() => toggleModal(true, val)}
                            >
                              <p className="text-black/80">See Values</p>
                            </button>
                          )
                        }
                      />
                    );
                  })}
                </Table.Row>
              );
          })}
        </Table.Root>
        <CustomFooter className="w-full" />
      </div>
    </div>
  );
}
