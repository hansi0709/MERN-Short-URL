    vector<int> postorder(TreeNode* root) {
        
        if (!root) return {}; //must check
        
        vector <TreeNode *> currentNode;
        currentNode.push_back(root);
        vector <int> newList;
        
        while(currentNode.size())
        {
            newList.insert(newList.begin(), currentNode.front()->value);
            for( auto x: currentNode.front()->children)
            {
                currentNode.push_back(x);
            }
            currentNode.erase(currentNode.begin());
        }
        
        return newList;
            
    }