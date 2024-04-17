import React, { useEffect, useState } from "react";
import { Tag } from "antd";

interface Props {
  list: string[];
}

const AAAA: React.FC<Props> = ({ list }: Props) => {
  console.log("heelo");
  const [tags, setTags] = useState<string[]>([]);
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  useEffect(() => {
    console.log("updae");
    console.log(list);
    setTags(list);
  }, [list]);

  return (
    <div
      style={{
        marginBottom: 16,
      }}
    >
      {tags.map((tag: string, index: number) => (
        <span
          key={index}
          style={{
            display: "inline-block",
          }}
        >
          <Tag
            closable
            onClose={(e) => {
              e.preventDefault();
              handleClose(tag);
            }}
          >
            {tag}
          </Tag>
        </span>
      ))}
    </div>
  );
};

export default AAAA;
