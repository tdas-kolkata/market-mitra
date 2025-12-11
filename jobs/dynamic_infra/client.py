import requests
from http import HTTPStatus
import dotenv
import os
import paramiko
import time
from enum import StrEnum, auto

class NodeNotFound(Exception):
    pass

class VMStates(StrEnum):
    RUNNING = auto()
    TERMIANATING = auto()
    CREATING = auto()


class ExcClient:
    def __init__(self,token:str, host:str = "https://compute.excloud.in"):
        self.token = token
        self.host = host
        self.headers = {
            "Authorization": f"Bearer {self.token}"
        }

    def GetStatus(self, vm_id:int)->str:
        response = requests.get(f"{self.host}/compute/list", headers=self.headers)
        if response.status_code == HTTPStatus.OK:
            node_list = response.json()
            for node in node_list:
                if node["vm_id"] == vm_id:
                    return node["state"]
            raise NodeNotFound

    def CreateVM(self, type:str, name:str, ssh_pubkey:str)->int:
        req_body = {
            "allocate_public_ipv4": True,
            "image_id": 10,
            "instance_type": type,
            "name": name,
            "project_id": 1,
            "ssh_pubkey": ssh_pubkey,
            "subnet_id": 387,
            "zone_id": 1,
            "security_group_ids": [
                505
            ],
            "root_volume": {
                "size_gib": 8,
                "zone_id": 1,
                "baseline_iops": 3000,
                "baseline_throughput_mbps": 125
            }
        }
        response = requests.post(f"{self.host}/compute/create", json = req_body, headers=self.headers)
        if response.status_code == HTTPStatus.OK:
            print("Created VM successfully")
            response_body = response.json()
            vm_id = response_body["vm_id"]
            public_ipv4 = response_body["public_ipv4"]
            print(f"Details - \n ID - {vm_id} \n IP - {public_ipv4}\n")
            return vm_id, public_ipv4
        else:
            print("Failed to create the VM")
            return None, None

    def DestroyVM(self,vm_id: int):
        req_body = {
            "vm_id": vm_id
        }
        response = requests.post(f"{self.host}/compute/terminate", json = req_body, headers = self.headers)
        if response.status_code == HTTPStatus.OK:
            print("Started termination of VM successfully")

    def ConnectWithVM(self, vm_id:str, user:str = "root")->str:
        req_body = {
            "vm_id": vm_id
        }
        response = requests.post(f"{self.host}/compute/instance/connect", json = req_body, headers = self.headers)
        if response.status_code == HTTPStatus.OK:
            print("Connected with VM successfully")
            return response.json()["id"]


if __name__ == '__main__':
    dotenv.load_dotenv()
    token = os.getenv("EXC_TOKEN")
    # print(token)
    client = ExcClient(token=token)

    vm_id, public_ipv4 = client.CreateVM(type="t1.nano", name="worker-node-python", ssh_pubkey="td-local")
    # client.DestroyVM(vm_id=6140)
    # id = client.ConnectWithVM(vm_id=6144, user="ubuntu")
    # print(id)

    # paramiko_client = paramiko.SSHClient()
    # try:
    #     paramiko_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    #     paramiko_client.connect(hostname="210.79.129.253", username="ubuntu")
    # except Exception as e:
    #     print(e)
    #     raise

    # client.DestroyVM(vm_id=6807)
    status = VMStates.CREATING
    while status != VMStates.RUNNING:
        status = client.GetStatus(vm_id)
        status = VMStates(status.lower())
        print(f"{vm_id} vm state - {status}")
        time.sleep(2)