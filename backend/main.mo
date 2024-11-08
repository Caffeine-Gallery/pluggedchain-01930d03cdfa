import Bool "mo:base/Bool";

import Principal "mo:base/Principal";
import Text "mo:base/Text";

actor {
    // Query call to get user's greeting
    public query func greet(user : Principal) : async Text {
        return "Hello, " # Principal.toText(user) # "! Welcome to the dapp.";
    };

    // Query to check if the caller is anonymous
    public query func isAnonymous(caller : Principal) : async Bool {
        Principal.isAnonymous(caller)
    };
};
