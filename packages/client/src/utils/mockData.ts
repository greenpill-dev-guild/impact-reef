export const endorsments: {
  id: string;
  message: string;
  author: string;
  date: string;
}[] = [
  {
    id: "1",
    message:
      "Lorem ipsum dolor sit amet consectetur. Orci et molestie magna massa molestie. Ante iaculis laoreet et scelerisque augue sollicitudin condimentum lacinia est. Vulputate faucibus quam nunc porta posuere et vitae erat. Tellus sit lectus nulla sed auctor sapien at amet. Sed rutrum habitasse urna volutpat eget urna odio augue. Viverra facilisi orci maecenas enim sapien eget non. Tristique ac rhoncus metus etiam enim facilisis ac. Amet viverra ut tempus vel nisl lacus fringilla risus vitae adipiscing.",
    author: "afo-wefa.eth",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    message:
      "This section here should be fix height, and we should have max. character limit in the form.",
    author: "chiali.eth",
    date: new Date().toISOString(),
  },
  {
    id: "30",
    message:
      "Lorem ipsum dolor sit amet consectetur. Orci et molestie magna massa molestie. Ante iaculis laoreet et scelerisque augue sollicitudin condimentum lacinia est. Vulputate faucibus quam nunc porta posuere et vitae erat. Tellus sit lectus nulla sed auctor sapien at amet. Sed rutrum habitasse urna volutpat eget urna odio augue. Viverra facilisi orci maecenas enim sapien eget non. Tristique ac rhoncus metus etiam enim facilisis ac. Amet viverra ut tempus vel nisl lacus fringilla risus vitae adipiscing.",
    author: "afo-wefa.eth",
    date: new Date().toISOString(),
  },
  {
    id: "3",
    message:
      "Lorem ipsum dolor sit amet consectetur. Orci et molestie magna massa molestie. Ante iaculis laoreet et scelerisque augue sollicitudin condimentum lacinia est. Vulputate faucibus quam nunc porta posuere et vitae erat. Tellus sit lectus nulla sed auctor sapien at amet. Sed rutrum habitasse urna volutpat eget urna odio augue. Viverra facilisi orci maecenas enim sapien eget non. Tristique ac rhoncus metus etiam enim facilisis ac. Amet viverra ut tempus vel nisl lacus fringilla risus vitae adipiscing.",
    author: "0x2aa64E6d80390F5C017F0313cB908051BE2FD35e",
    date: new Date().toISOString(),
  },
  {
    id: "4",
    message:
      "Lorem ipsum dolor sit amet consectetur. Orci et molestie magna massa molestie. Ante iaculis laoreet et scelerisque augue sollicitudin condimentum lacinia est. Vulputate faucibus quam nunc porta posuere et vitae erat. Tellus sit lectus nulla sed auctor sapien at amet. Sed rutrum habitasse urna volutpat eget urna odio augue. Viverra facilisi orci maecenas enim sapien eget non. Tristique ac rhoncus metus etiam enim facilisis ac. Amet viverra ut tempus vel nisl lacus fringilla risus vitae adipiscing.",
    author: "afo-wefa.eth",
    date: new Date().toISOString(),
  },
  {
    id: "5",
    message:
      "Lorem ipsum dolor sit amet consectetur. Orci et molestie magna massa molestie. Ante iaculis laoreet et scelerisque augue sollicitudin condimentum lacinia est. Vulputate faucibus quam nunc porta posuere et vitae erat. Tellus sit lectus nulla sed auctor sapien at amet. Sed rutrum habitasse urna volutpat eget urna odio augue. Viverra facilisi orci maecenas enim sapien eget non. Tristique ac rhoncus metus etiam enim facilisis ac. Amet viverra ut tempus vel nisl lacus fringilla risus vitae adipiscing.",
    author: "0x5d638a6E9089ea3140F97E85Cd1FC54bd6f0023e",
    date: new Date().toISOString(),
  },
  {
    id: "11",
    message:
      "Lorem ipsum dolor sit amet consectetur. Orci et molestie magna massa molestie. Ante iaculis laoreet et scelerisque augue sollicitudin condimentum lacinia est. Vulputate faucibus quam nunc porta posuere et vitae erat. Tellus sit lectus nulla sed auctor sapien at amet. Sed rutrum habitasse urna volutpat eget urna odio augue. Viverra facilisi orci maecenas enim sapien eget non. Tristique ac rhoncus metus etiam enim facilisis ac. Amet viverra ut tempus vel nisl lacus fringilla risus vitae adipiscing.",
    author: "afo-wefa.eth",
    date: new Date().toISOString(),
  },
  {
    id: "6",
    message:
      "Lorem ipsum dolor sit amet consectetur. Orci et molestie magna massa molestie. Ante iaculis laoreet et scelerisque augue sollicitudin condimentum lacinia est. Vulputate faucibus quam nunc porta posuere et vitae erat. Tellus sit lectus nulla sed auctor sapien at amet. Sed rutrum habitasse urna volutpat eget urna odio augue. Viverra facilisi orci maecenas enim sapien eget non. Tristique ac rhoncus metus etiam enim facilisis ac. Amet viverra ut tempus vel nisl lacus fringilla risus vitae adipiscing.",
    author: "0x5d638a6E9089ea3140F97E85Cd1FC54bd6f0023e",
    date: new Date().toISOString(),
  },
];

export const metrics: { title: string; value: number }[] = [
  {
    title: "Number of OP Stack modules dependent on this contribution",
    value: 0,
  },
  {
    title: "Number of merged contributions to the OP Stack",
    value: 3083091,
  },
  {
    title: "Bytecode size reduction",
    value: 0,
  },
  {
    title: "Response time for RPC calls",
    value: 482401,
  },
  {
    title: "Gas costs reduction in contract creation",
    value: 32,
  },
  {
    title:
      "Number of modules that were developed simultaneously without causing issues",
    value: 0,
  },
];

export const projects: ProjectItem[] = [
  {
    id: "1",
    creator: "",
    title: "Project name",
    avatar_image: "/images/project-icon.png",
    category: "cefi",
    transactions_count: 210203,
    attestation_counts: 2,
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    creator: "",
    title: "Project name long name warp",
    avatar_image: "/images/project-icon.png",
    category: "cross-chain",
    transactions_count: 210203,
    attestation_counts: 10,
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "defi",
    transactions_count: 21020,
    attestation_counts: 7,
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    creator: "",
    title: "Project name",
    avatar_image: "/images/project-icon.png",
    category: "governance",
    transactions_count: 10203,
    attestation_counts: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "nft",
    transactions_count: 7203,
    attestation_counts: 3,
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    creator: "",
    title: "Project name",
    avatar_image: "/images/project-icon.png",
    category: "social",
    transactions_count: 0,
    attestation_counts: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "11",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "12",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "13",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "14",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "15",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
  {
    id: "16",
    creator: "",
    title: "Project name",
    avatar_image: "",
    category: "utility",
    transactions_count: 0,
    attestation_counts: 12,
    updated_at: new Date().toISOString(),
  },
];
