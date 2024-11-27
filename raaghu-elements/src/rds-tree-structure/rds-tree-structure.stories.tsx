import React from 'react';
        import { Story, Meta } from '@storybook/react';
        import RdsTreeStructure from './rds-tree-structure';

        export default {
        title: 'Elements/Tree Structure',
        component: RdsTreeStructure,
        parameters: {
                layout: 'padded',
            },
            tags: ['autodocs'],
        argTypes: {
                level: {
                    options: [
                        "level1",
                        "level2",
                        "level3",
                        "level4",
                    ],
                    control: { type: "select" },
                },
                folderType: {
                        options: [
                                "circle",
                                "folder",
                        ],
                        control: { type: "select" },
                },
                state: {
                        options: [
                                "default",
                                "hover",
                                "selected"
                        ],
                        control: { type: "select" },
                },
                fileLanguage: {
                        options:[
                                "CSS",
                                "Cplus",
                                "Config",
                                "Database",
                                "Docker",
                                "ESLint",
                                "Git",
                                "GitHub",
                                "Go",
                                "Gulp",
                                "HTML",
                                "JS",
                                "JSON",
                                "Markdown",
                                "Notebook",
                                "Python",
                                "React",
                                "Sass",
                                "TypeScript",
                                "XML",
                                "YML"

                        ],
                        control:{ type: "select"}
                } 
            },
        } as Meta;
        
        const Template: Story<{}> = (args) => <RdsTreeStructure {...args} />;

        export const Default = Template.bind({});
        Default.args = {
                level: "level4",
                state: "default",
                showChewron: true,
                showCheckbox: true,
                showFolder: true,
                showFileIcon: true,
                showActions: true,
                showCollapsed: false,
                folderType: "folder",
                fileLanguage: "CSS",
                treeData :[
                        {
                          id: 1,
                          name: "Name 1",
                          icon: "folder",
                          children: [
                            {
                              id: 2,
                              name: "Name 2",
                              icon: "folder",
                              children: [
                                {
                                  id: 3,
                                  name: "Name 3",
                                  icon: "file",
                                  children: [
                                    {
                                      id: 4,
                                      name: "Name 4",
                                      icon: "file",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 5,
                          name: "Name 5",
                          icon: "folder",
                          children: [
                            {
                              id: 6,
                              name: "Name 6",
                              icon: "folder",
                              children: [
                                {
                                  id: 7,
                                  name: "Name 7",
                                  icon: "file",
                                  children: [
                                    {
                                      id: 8,
                                      name: "Name 8",
                                      icon: "file",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 9,
                          name: "Name 9",
                          icon: "folder",
                          children: [
                            {
                              id: 10,
                              name: "Name 10",
                              icon: "folder",
                              children: [
                                {
                                  id: 11,
                                  name: "Name 11",
                                  icon: "file",
                                  children: [
                                    {
                                      id: 12,
                                      name: "Name 12",
                                      icon: "file",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          id: 13,
                          name: "Name 13",
                          icon: "folder",
                          children: [
                            {
                              id: 14,
                              name: "Name 14",
                              icon: "folder",
                              children: [
                                {
                                  id: 15,
                                  name: "Name 15",
                                  icon: "file",
                                  children: [
                                    {
                                      id: 16,
                                      name: "Name 16",
                                      icon: "file",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
        };
        Default.parameters = { controls: { include: ['level','state','showChewron','showCheckbox','showFolder','showFileIcon','showActions','showCollapsed','fileLanguage','folderType','treeData'] } };