import React, { useState, useRef, useCallback } from 'react';

interface IsearchBoxProps {
  setSelectedSearchOption: (value: string) => void;
  setInputSearchValue: (value: string) => void;
  getPostsList: () => void;
}

const SearchBox = ({ setSelectedSearchOption, setInputSearchValue, getPostsList }: IsearchBoxProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('제목');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  }, []);

  const handleChangeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(e.target.value);
  }, []);

  const handleSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      setSelectedSearchOption(selectedOption);
      setInputSearchValue(inputValue);
      getPostsList();
    },
    [inputValue, selectedOption]
  );

  return (
    <form onSubmit={handleSubmitForm}>
      <select onChange={handleChangeSelect} value={selectedOption}>
        <option>제목</option>
        <option>제목+내용</option>
        <option>작성자</option>
      </select>
      <input
        onChange={handleChangeInput}
        value={inputValue}
        ref={inputRef}
        placeholder="검색어를 입력해 주세요"
      />
      <button>검색</button>
    </form>
  );
};

export default SearchBox;
