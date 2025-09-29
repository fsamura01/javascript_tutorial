import React, { useState } from "react";

const SubstringDemo = () => {
  const [currentWord, setCurrentWord] = useState("burger");
  const [searchWord, setSearchWord] = useState("burg");

  const extracted = currentWord.substring(0, searchWord.length);
  const isMatch = extracted === searchWord;

  const examples = [
    { word: "burger", search: "burg" },
    { word: "eating", search: "eat" },
    { word: "love", search: "loving" },
    { word: "problem", search: "pro" },
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">
          Interactive Substring Prefix Demo
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Word:
            </label>
            <input
              type="text"
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter current word"
            />
          </div>
          <div>
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter search word"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="font-mono">
            currentWord.substring(0, {searchWord.length}) = "{extracted}"
          </p>
          <p className="mt-2">
            Is Prefix Match:{" "}
            <span
              className={
                isMatch ? "text-green-600 font-bold" : "text-red-600 font-bold"
              }
            >
              {isMatch.toString()}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">More Examples:</h3>
        <div className="space-y-2">
          {examples.map(({ word, search }, index) => {
            const substr = word.substring(0, search.length);
            const matches = substr === search;
            return (
              <div key={index} className="p-2 bg-gray-50 rounded">
                <p className="font-mono text-sm">
                  "{word}".substring(0, {search.length}) = "{substr}"
                </p>
                <p className="text-sm">
                  Matches "{search}":{" "}
                  <span className={matches ? "text-green-600" : "text-red-600"}>
                    {matches.toString()}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubstringDemo;
