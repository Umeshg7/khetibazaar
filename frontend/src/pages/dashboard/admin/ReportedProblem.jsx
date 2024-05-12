import React, { useState } from "react";
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ReportedProblems = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { refetch, data: problems = [] } = useQuery({
    queryKey: ["problems"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chat");
      return res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  });


  // Function to group messages by sender
  const groupMessagesBySender = (problems) => {
    const groupedMessages = {};
    problems.forEach((problem) => {
      const sender = problem.sender;
      if (!groupedMessages[sender]) {
        groupedMessages[sender] = [];
      }
      groupedMessages[sender].push(problem);
    });
    return groupedMessages;
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>Reported Problems</h5>
        <h5>Total Problems: {problems.length}</h5>
      </div>

      {/* Problems table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* Table headers */}
          <thead className="bg-green text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {/* Grouping messages by sender */}
            {Object.entries(groupMessagesBySender(problems)).map(([sender, messages], index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{sender}</td>
                <td>
                  {/* Rendering all messages of the sender */}
                  {messages.map((message, messageIndex) => (
                    <div key={messageIndex}>{message.message}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProblems;
