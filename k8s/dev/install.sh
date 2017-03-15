#!/bin/bash
kubectl -n gridvo get svc | grep -q smartgrid-ms
if [ "$?" == "1" ];then
	kubectl create -f smartgrid_ms-service.yaml --record
	kubectl -n gridvo get svc | grep -q smartgrid-ms
	if [ "$?" == "0" ];then
		echo "smartgrid_ms-service install success!"
	else
		echo "smartgrid_ms-service install fail!"
	fi
else
	echo "smartgrid_ms-service is exist!"
fi
kubectl -n gridvo get pods | grep -q smartgrid-ms
if [ "$?" == "1" ];then
	kubectl create -f smartgrid_ms-deployment.yaml --record
	kubectl -n gridvo get pods | grep -q smartgrid-ms
	if [ "$?" == "0" ];then
		echo "smartgrid_ms-deployment install success!"
	else
		echo "smartgrid_ms-deployment install fail!"
	fi
else
	kubectl delete -f smartgrid_ms-deployment.yaml
	kubectl -n gridvo get pods | grep -q smartgrid-ms
	while [ "$?" == "0" ]
	do
	kubectl -n gridvo get pods | grep -q smartgrid-ms
	done
	kubectl create -f smartgrid_ms-deployment.yaml --record
	kubectl -n gridvo get pods | grep -q smartgrid-ms
	if [ "$?" == "0" ];then
		echo "smartgrid_ms-deployment update success!"
	else
		echo "smartgrid_ms-deployment update fail!"
	fi
fi