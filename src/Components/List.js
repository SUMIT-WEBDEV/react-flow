import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { Link } from "react-router-dom";
import Loader from "./WorkFlow/Loader/Loader";
import { MdInput } from "react-icons/md";

function List({ list }) {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return list.length === 0 ? (
    <div className="list__Loader">
      <Loader />
    </div>
  ) : (
    <>
      <h2 className="list__Header">WorkFlows</h2>

      <div className="list">
        <div className="list__Wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Input Type</th>
                <th>Created at</th>
              </tr>
            </thead>

            {list.map((l, key) => (
              <tbody>
                <tr>
                  <Link to={{ pathname: `/workflow/${l.id}` }}>
                    <td className="list__Names">{l.name}</td>
                  </Link>
                  <td className="list__Input">{l.input_type}</td>
                  <td className="list__date">{formatDate(l.createdAt)}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default List;
