'use client';

import React from 'react';

const SidebarNotes = () => {
  const allCategories = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <aside>
      <ul>
        {allCategories.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarNotes;