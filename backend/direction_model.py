import pandas as pd

## IMPORTS FOR TORCH MODEL
import torch
from torch.utils.data import Dataset
from transformers import BertTokenizer
from torch.utils.data import DataLoader
import torch.nn as nn
from transformers import BertModel
import torch.optim as optim

class TDataset(Dataset):

    def __init__(self, data, maxlen):

        #Store the contents of the data (coming in json format) in a pandas dataframe
        data_df=data

        print('data df: ',data_df)

        self.df = data_df

        #Initialize the BERT tokenizer
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

        self.maxlen = maxlen

    def __len__(self):
        return len(self.df)

    def __getitem__(self, index):

        #Selecting the sentence and label at the specified index in the data frame
        
        sentence = self.df.loc[index, 'text']

        #Preprocessing the text to be suitable for BERT
        tokens = self.tokenizer.tokenize(sentence) #Tokenize the sentence
        tokens = ['[CLS]'] + tokens #+ ['[SEP]'] #Insering the CLS and SEP token in the beginning and end of the sentence
        if len(tokens) < self.maxlen:
            tokens = tokens + ['[PAD]' for _ in range(self.maxlen - len(tokens))] #Padding sentences
        else:
            tokens = tokens[:self.maxlen-1] + ['[SEP]'] #Prunning the list to be of specified max length

        #print('tokens are:', tokens)
        tokens_ids = self.tokenizer.convert_tokens_to_ids(tokens) # Obtaining the indices of the tokens in the BERT Vocabulary
        tokens_ids_tensor = torch.tensor(tokens_ids) #Converting the list to a pytorch tensor

        #Obtaining the attention mask i.e a tensor containing 1s for no padded tokens and 0s for padded ones
        attn_mask = (tokens_ids_tensor != 0).long()

        return tokens_ids_tensor, attn_mask


class DirectionClassifier(nn.Module):
    def __init__(self, freeze=True):
        super(DirectionClassifier, self).__init__()
        #Instantiating BERT model object 
        self.bert_layer = BertModel.from_pretrained('bert-base-uncased')
  
        #Classification layer
        #input dimension is 768 because [CLS] embedding has a dimension of 768
        #output dimension is 1 because we're working with binary classification problem
        self.cls_layer= nn.Linear(768,1)

    def forward(self, seq, attn_masks):
        '''
        Inputs:
            -seq : Tensor of shape [B, T] containing token ids of sequences
            -attn_masks : Tensor of shape [B, T] containing attention masks to be used to avoid contibution of PAD tokens
        '''

        #Feeding the input to BERT model to obtain contextualized representations
        #_, outputs = self.bert_layer(seq, attention_mask = attn_masks)[:2] #Added the [:2] which fixed an error
        #logits = self.cls_layer(outputs)


        #Feeding the input to BERT model to obtain contextualized representations
        outputs = self.bert_layer(seq, attention_mask = attn_masks)
        cont_reps = outputs.last_hidden_state

        #Obtaining the representation of [CLS] head (the first token)
        cls_rep = cont_reps[:, 0]

        #Feeding cls_rep to the classifier layer
        logits = self.cls_layer(cls_rep)

        return logits

    
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print('Using {} device'.format(device))

torch.cuda.empty_cache()

def load_model(path):

    direction_model = DirectionClassifier().to(device)
    path=path
    direction_model.load_state_dict(torch.load(path))
    direction_model.eval()
    print("Model loaded.")
    return direction_model



#path="/content/drive/MyDrive/data NLP/best0.dat"
#direction_model=load_model(path)

#criterion=nn.BCEWithLogitsLoss()

#opti = optim.Adam(direction_model.parameters(), lr = 4e-5)

def load_data(data):
    dataset = TDataset(data, maxlen=350)
    loader = DataLoader(dataset, batch_size = 12, num_workers = 0)
    return loader

def predict(direction_model, dataloader, device):
    direction_model.eval()

    with torch.no_grad():
        ids=[]
        preds=[]
        prediction=""
        for seq, attn_masks in dataloader:
            seq, attn_masks= seq.cuda(device), attn_masks.cuda(device)
            logits = direction_model(seq, attn_masks)
            
            
            probs = torch.sigmoid(logits.unsqueeze(-1))
            soft_probs = (probs > 0.5).long()
            preds=soft_probs.squeeze().cpu().numpy().tolist()

        
        if preds==1:
            prediction="up"
        elif preds==0:
            prediction="down"
        
            
    return prediction   