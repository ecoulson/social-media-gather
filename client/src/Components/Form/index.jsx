import React from "react";

export default ({ children, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  return <form onSubmit={handleSubmit}>{children}</form>;
};
