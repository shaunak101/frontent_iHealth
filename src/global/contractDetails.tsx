const contractAddress = "0x7bF4BAE103e2dBcC406cb5C1C56Afb1037224E8b";

const contractABI =  [
  {
    "inputs": [],
    "name": "UserRegistry_AccountExists",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UserRegistry_NoAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "name": "createEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "accountCreated",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgArgs",
        "type": "string"
      }
    ],
    "name": "changeDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "msgArg",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pps",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isDoctor",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "pubKey",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "encKey",
        "type": "string"
      }
    ],
    "name": "createAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getManagingAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "signIn",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const userABI =  [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "pubKey",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "encKey",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "alreadyDoctor",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "notOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "nickName",
        "type": "string"
      }
    ],
    "name": "addDoctor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "toAdd",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "addToRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "doctorHandler",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "ipfsLink",
        "type": "string"
      }
    ],
    "name": "createRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDoctors",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "doctorAddress",
        "type": "address"
      }
    ],
    "name": "getNickName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProfile",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "pubAdd",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "encKey",
            "type": "string"
          }
        ],
        "internalType": "struct UserToken.publicProfile",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "doctorHandler",
        "type": "address"
      }
    ],
    "name": "getRecords",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "ipfsLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "doctor",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "hasAccess",
            "type": "address[]"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct UserToken.document[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "hasAccess",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "profile",
    "outputs": [
      {
        "internalType": "string",
        "name": "pubAdd",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "encKey",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "records",
    "outputs": [
      {
        "internalType": "string",
        "name": "ipfsLink",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "doctor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const doctorTokenABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "pubKey",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "encKey",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "nickName",
        "type": "string"
      }
    ],
    "name": "addPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "patientContract",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "ipfsLink",
        "type": "string"
      }
    ],
    "name": "createDocs",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "patientHandler",
        "type": "address"
      }
    ],
    "name": "getDocuments",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "ipfsLink",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "doctor",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "hasAccess",
            "type": "address[]"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "internalType": "struct UserToken.document[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProfile",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "encKey",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "pubKey",
            "type": "string"
          }
        ],
        "internalType": "struct DoctorToken.publicProfile",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRequests",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "patients",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "profile",
    "outputs": [
      {
        "internalType": "string",
        "name": "encKey",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "pubKey",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "patientHandler",
        "type": "address"
      }
    ],
    "name": "requestDoctor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export {contractABI, contractAddress, userABI, doctorTokenABI};
