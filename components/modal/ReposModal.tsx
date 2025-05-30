import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { IRepos } from '@/interfaces/IRepos'; // Mantenha sua interface de repositórios

export type ReposModalProps = {
  visible: boolean;
  onAdd: (ownerId: string, repoId: string, id?: number) => void;
  onCancel: () => void;
  repos?: IRepos;
}

export default function ReposModal({ visible, onAdd, onCancel, repos }: ReposModalProps) {
  const [ownerId, setOwnerId] = useState<string>('');
  const [repoId, setRepoId] = useState<string>('');
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (repos) {
      setOwnerId(repos.ownerId.trim());
      setRepoId(repos.repoId.trim());
      setId(repos.id);
    } else {
      setOwnerId('');
      setRepoId('');
      setId(0);
    }
  }, [repos]);

  const handleAdd = () => {
    onAdd(ownerId, repoId, id);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => { }}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{repos ? 'Editar Repositório' : 'Adicionar Repositório'}</Text>
          <Text style={styles.modalText}>Preencha os dados do repositório:</Text>

          <Text style={styles.inputLabel}>Owner ID:</Text>
          <TextInput
            style={styles.textInput}
            value={ownerId}
            onChangeText={setOwnerId}
            placeholder="proprietário"
            placeholderTextColor="#888" 
          />

          <Text style={styles.inputLabel}>Repo ID:</Text>
          <TextInput
            style={styles.textInput}
            value={repoId}
            onChangeText={setRepoId}
            placeholder="repositório"
            placeholderTextColor="#888"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addText}>{repos ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: 300,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', 
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1, 
    marginRight: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});