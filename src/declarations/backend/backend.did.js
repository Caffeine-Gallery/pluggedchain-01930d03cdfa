export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'greet' : IDL.Func([IDL.Principal], [IDL.Text], ['query']),
    'isAnonymous' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
