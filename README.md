# Criipto Document Signatures API Demo

This repository serves as an example of how you might implement the Criipto Document Signatures GraphQL API.

[API Demo](https://criipto-signatures-api-demo-prod.netlify.app/)

We also have a [GraphQL Explorer](https://signatures-api-prod.azurewebsites.net/v1/explorer)

## GraphQL

If you have not worked with GraphQL before we suggest you read through [Introduction to GraphQL](https://graphql.org/learn/) and [The Fullstack Tutorial for GraphQL](https://www.howtographql.com/).

## Example Queries & Mutations

### Creating a signature order

```
mutation {
  createSignatureOrder(input: {
    documents:[{
      pdf: {
        title: "Terms of service"
        storageMode: Temporary
        blob: "JVBERi0yLjANCg0KMSAwIG9iag0KPDwNCiAgL1R5cGUgL0NhdGFsb2cNCiAgL01ldGFkYXRhIDIgMCBSDQogIC9QYWdlcyAzIDAgUg0KPj4NCmVuZG9iag0KDQoyIDAgb2JqDQo8PA0KICAvTGVuZ3RoIDIzNTENCiAgL1R5cGUgL01ldGFkYXRhDQogIC9TdWJ0eXBlIC9YTUwNCj4+DQpzdHJlYW0NCjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0luc2VydCBYTVAgdG9vbCBuYW1lIGhlcmUuJz4NCiAgPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPg0KICAgICAgPHBkZjpQcm9kdWNlcj5EYXRhbG9naWNzIC0gZXhhbXBsZSBwcm9kdWNlciBwcm9ncmFtIG5hbWUgaGVyZTwvcGRmOlByb2R1Y2VyPg0KICAgICAgPHBkZjpDb3B5cmlnaHQ+Q29weXJpZ2h0IDIwMTcgUERGIEFzc29jaWF0aW9uPC9wZGY6Q29weXJpZ2h0Pg0KICAgICAgPHBkZjpLZXl3b3Jkcz5QREYgMi4wIHNhbXBsZSBleGFtcGxlPC9wZGY6S2V5d29yZHM+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4NCiAgICAgIDx4YXA6Q3JlYXRlRGF0ZT4yMDE3LTA1LTI0VDEwOjMwOjExWjwveGFwOkNyZWF0ZURhdGU+DQogICAgICA8eGFwOk1ldGFkYXRhRGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1ldGFkYXRhRGF0ZT4NCiAgICAgIDx4YXA6TW9kaWZ5RGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1vZGlmeURhdGU+DQogICAgICA8eGFwOkNyZWF0b3JUb29sPkRhdGFsb2dpY3MgLSBleGFtcGxlIGNyZWF0b3IgdG9vbCBuYW1lIGhlcmU8L3hhcDpDcmVhdG9yVG9vbD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPg0KICAgICAgPGRjOmZvcm1hdD5hcHBsaWNhdGlvbi9wZGY8L2RjOmZvcm1hdD4NCiAgICAgIDxkYzp0aXRsZT4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5BIHNpbXBsZSBQREYgMi4wIGV4YW1wbGUgZmlsZTwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOnRpdGxlPg0KICAgICAgPGRjOmNyZWF0b3I+DQogICAgICAgIDxyZGY6U2VxPg0KICAgICAgICAgIDxyZGY6bGk+RGF0YWxvZ2ljcyBJbmNvcnBvcmF0ZWQ8L3JkZjpsaT4NCiAgICAgICAgPC9yZGY6U2VxPg0KICAgICAgPC9kYzpjcmVhdG9yPg0KICAgICAgPGRjOmRlc2NyaXB0aW9uPg0KICAgICAgICA8cmRmOkFsdD4NCiAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkRlbW9uc3RyYXRpb24gb2YgYSBzaW1wbGUgUERGIDIuMCBmaWxlLjwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOmRlc2NyaXB0aW9uPg0KICAgICAgPGRjOnJpZ2h0cz4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5Db3B5cmlnaHQgMjAxNyBQREYgQXNzb2NpYXRpb24uIExpY2Vuc2VkIHRvIHRoZSBwdWJsaWMgdW5kZXIgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1TaGFyZUFsaWtlIDQuMCBJbnRlcm5hdGlvbmFsIGxpY2Vuc2UuPC9yZGY6bGk+DQogICAgICAgIDwvcmRmOkFsdD4NCiAgICAgIDwvZGM6cmlnaHRzPg0KICAgIDwvcmRmOkRlc2NyaXB0aW9uPg0KICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhhcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iPg0KICAgICAgPHhhcFJpZ2h0czpNYXJrZWQ+VHJ1ZTwveGFwUmlnaHRzOk1hcmtlZD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIj4NCiAgICAgIDxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL3NhLzQuMC8iIC8+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iPg0KICAgICAgPHhhcE1NOkRvY3VtZW50SUQ+dXVpZDozZWVmMjE2Ni04MzMyLWFiYjQtM2QzMS03NzMzNDU3ODg3M2Y8L3hhcE1NOkRvY3VtZW50SUQ+DQogICAgICA8eGFwTU06SW5zdGFuY2VJRD51dWlkOjk5MWJjY2U3LWVlNzAtMTFhMy05MWFhLTc3YmJlMjE4MWZkODwveGFwTU06SW5zdGFuY2VJRD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgPC9yZGY6UkRGPg0KPC94OnhtcG1ldGE+DQplbmRzdHJlYW0NCmVuZG9iag0KDQozIDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZXMNCiAgL0tpZHMgWzQgMCBSXQ0KICAvQ291bnQgMQ0KPj4NCmVuZG9iag0KDQo0IDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZQ0KICAvUGFyZW50IDMgMCBSDQogIC9NZWRpYUJveCBbMCAwIDYxMiAzOTZdDQogIC9Db250ZW50cyBbNSAwIFIgNiAwIFJdDQogIC9SZXNvdXJjZXMgPDwNCiAgICAvRm9udCA8PCAvRjEgNyAwIFIgPj4NCiAgPj4NCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCA3NDQgPj4NCnN0cmVhbQ0KJSBTYXZlIHRoZSBjdXJyZW50IGdyYXBoaWMgc3RhdGUNCnEgDQoNCiUgRHJhdyBhIGJsYWNrIGxpbmUgc2VnbWVudCwgdXNpbmcgdGhlIGRlZmF1bHQgbGluZSB3aWR0aC4NCjE1MCAyNTAgbQ0KMTUwIDM1MCBsDQpTDQoNCiUgRHJhdyBhIHRoaWNrZXIsIGRhc2hlZCBsaW5lIHNlZ21lbnQuDQo0IHcgJSBTZXQgbGluZSB3aWR0aCB0byA0IHBvaW50cw0KWzQgNl0gMCBkICUgU2V0IGRhc2ggcGF0dGVybiB0byA0IHVuaXRzIG9uLCA2IHVuaXRzIG9mZg0KMTUwIDI1MCBtDQo0MDAgMjUwIGwNClMNCltdIDAgZCAlIFJlc2V0IGRhc2ggcGF0dGVybiB0byBhIHNvbGlkIGxpbmUNCjEgdyAlIFJlc2V0IGxpbmUgd2lkdGggdG8gMSB1bml0DQoNCiUgRHJhdyBhIHJlY3RhbmdsZSB3aXRoIGEgMS11bml0IHJlZCBib3JkZXIsIGZpbGxlZCB3aXRoIGxpZ2h0IGJsdWUuDQoxLjAgMC4wIDAuMCBSRyAlIFJlZCBmb3Igc3Ryb2tlIGNvbG9yDQowLjUgMC43NSAxLjAgcmcgJSBMaWdodCBibHVlIGZvciBmaWxsIGNvbG9yDQoyMDAgMzAwIDUwIDc1IHJlDQpCDQoNCiUgRHJhdyBhIGN1cnZlIGZpbGxlZCB3aXRoIGdyYXkgYW5kIHdpdGggYSBjb2xvcmVkIGJvcmRlci4NCjAuNSAwLjEgMC4yIFJHDQowLjcgZw0KMzAwIDMwMCBtDQozMDAgNDAwIDQwMCA0MDAgNDAwIDMwMCBjDQpiDQoNCiUgUmVzdG9yZSB0aGUgZ3JhcGhpYyBzdGF0ZSB0byB3aGF0IGl0IHdhcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgc3RyZWFtDQpRDQoNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8IC9MZW5ndGggMTY2ID4+DQpzdHJlYW0NCiUgQSB0ZXh0IGJsb2NrIHRoYXQgc2hvd3MgIkhlbGxvIFdvcmxkIg0KJSBObyBjb2xvciBpcyBzZXQsIHNvIHRoaXMgZGVmYXVsdHMgdG8gYmxhY2sgaW4gRGV2aWNlR3JheSBjb2xvcnNwYWNlDQpCVA0KICAvRjEgMjQgVGYNCiAgMTAwIDEwMCBUZA0KICAoSGVsbG8gV29ybGQpIFRqDQpFVA0KZW5kc3RyZWFtDQplbmRvYmoNCg0KNyAwIG9iag0KPDwNCiAgL1R5cGUgL0ZvbnQNCiAgL1N1YnR5cGUgL1R5cGUxDQogIC9CYXNlRm9udCAvSGVsdmV0aWNhDQogIC9GaXJzdENoYXIgMzMNCiAgL0xhc3RDaGFyIDEyNg0KICAvV2lkdGhzIDggMCBSDQogIC9Gb250RGVzY3JpcHRvciA5IDAgUg0KPj4NCmVuZG9iag0KDQo4IDAgb2JqDQpbIDI3OCAzNTUgNTU2IDU1NiA4ODkgNjY3IDIyMiAzMzMgMzMzIDM4OSA1ODQgMjc4IDMzMyAyNzggMjc4IDU1Ng0KICA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAyNzggMjc4IDU4NCA1ODQgNTg0IDU1NiAxMDE1DQogIDY2NyA2NjcgNzIyIDcyMiA2NjcgNjExIDc3OCA3MjIgMjc4IDUwMCA2NjcgNTU2IDgzMyA3MjIgNzc4IDY2Nw0KICA3NzggNzIyIDY2NyA2MTEgNzIyIDY2NyA5NDQgNjY3IDY2NyA2MTEgMjc4IDI3OCAyNzggNDY5IDU1NiAyMjINCiAgNTU2IDU1NiA1MDAgNTU2IDU1NiAyNzggNTU2IDU1NiAyMjIgMjIyIDUwMCAyMjIgODMzIDU1NiA1NTYgNTU2DQogIDU1NiAzMzMgNTAwIDI3OCA1NTYgNTAwIDcyMiA1MDAgNTAwIDUwMCAzMzQgMjYwIDMzNCA1ODQgXQ0KZW5kb2JqDQoNCiUgVGhpcyBGb250RGVzY3JpcHRvciBjb250YWlucyBvbmx5IHRoZSByZXF1aXJlZCBlbnRyaWVzIGZvciBQREYgMi4wDQolIGZvciB1bmVtYmVkZGVkIHN0YW5kYXJkIDE0IGZvbnRzIHRoYXQgY29udGFpbiBMYXRpbiBjaGFyYWN0ZXJzDQo5IDAgb2JqDQo8PA0KICAvVHlwZSAvRm9udERlc2NyaXB0b3INCiAgL0ZvbnROYW1lIC9IZWx2ZXRpY2ENCiAgL0ZsYWdzIDMyDQogIC9Gb250QkJveCBbIC0xNjYgLTIyNSAxMDAwIDkzMSBdDQogIC9JdGFsaWNBbmdsZSAwDQogIC9Bc2NlbnQgNzE4DQogIC9EZXNjZW50IC0yMDcNCiAgL0NhcEhlaWdodCA3MTgNCiAgL1N0ZW1WIDg4DQogIC9NaXNzaW5nV2lkdGggMCAgDQo+Pg0KZW5kb2JqDQoNCiUgVGhlIG9iamVjdCBjcm9zcy1yZWZlcmVuY2UgdGFibGUuIFRoZSBmaXJzdCBlbnRyeQ0KJSBkZW5vdGVzIHRoZSBzdGFydCBvZiBQREYgZGF0YSBpbiB0aGlzIGZpbGUuDQp4cmVmDQowIDEwDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTIgMDAwMDAgbg0KMDAwMDAwMDA5MiAwMDAwMCBuDQowMDAwMDAyNTQzIDAwMDAwIG4NCjAwMDAwMDI2MTUgMDAwMDAgbg0KMDAwMDAwMjc3OCAwMDAwMCBuDQowMDAwMDAzNTgzIDAwMDAwIG4NCjAwMDAwMDM4MDcgMDAwMDAgbg0KMDAwMDAwMzk2OCAwMDAwMCBuDQowMDAwMDA0NTIwIDAwMDAwIG4NCnRyYWlsZXINCjw8DQogIC9TaXplIDEwDQogIC9Sb290IDEgMCBSDQogIC9JRCBbIDwzMWM3YThhMjY5ZTRjNTliYzNjZDdkZjBkYWJiZjM4OD48MzFjN2E4YTI2OWU0YzU5YmMzY2Q3ZGYwZGFiYmYzODg+IF0NCj4+DQpzdGFydHhyZWYNCjQ4NDcNCiUlRU9GDQo="
      }
    },{
      pdf: {
        title: "Privacy Policy"
        storageMode:Temporary
        blob: "JVBERi0yLjANCg0KMSAwIG9iag0KPDwNCiAgL1R5cGUgL0NhdGFsb2cNCiAgL01ldGFkYXRhIDIgMCBSDQogIC9QYWdlcyAzIDAgUg0KPj4NCmVuZG9iag0KDQoyIDAgb2JqDQo8PA0KICAvTGVuZ3RoIDIzNTENCiAgL1R5cGUgL01ldGFkYXRhDQogIC9TdWJ0eXBlIC9YTUwNCj4+DQpzdHJlYW0NCjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0luc2VydCBYTVAgdG9vbCBuYW1lIGhlcmUuJz4NCiAgPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPg0KICAgICAgPHBkZjpQcm9kdWNlcj5EYXRhbG9naWNzIC0gZXhhbXBsZSBwcm9kdWNlciBwcm9ncmFtIG5hbWUgaGVyZTwvcGRmOlByb2R1Y2VyPg0KICAgICAgPHBkZjpDb3B5cmlnaHQ+Q29weXJpZ2h0IDIwMTcgUERGIEFzc29jaWF0aW9uPC9wZGY6Q29weXJpZ2h0Pg0KICAgICAgPHBkZjpLZXl3b3Jkcz5QREYgMi4wIHNhbXBsZSBleGFtcGxlPC9wZGY6S2V5d29yZHM+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4NCiAgICAgIDx4YXA6Q3JlYXRlRGF0ZT4yMDE3LTA1LTI0VDEwOjMwOjExWjwveGFwOkNyZWF0ZURhdGU+DQogICAgICA8eGFwOk1ldGFkYXRhRGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1ldGFkYXRhRGF0ZT4NCiAgICAgIDx4YXA6TW9kaWZ5RGF0ZT4yMDE3LTA3LTExVDA3OjU1OjExWjwveGFwOk1vZGlmeURhdGU+DQogICAgICA8eGFwOkNyZWF0b3JUb29sPkRhdGFsb2dpY3MgLSBleGFtcGxlIGNyZWF0b3IgdG9vbCBuYW1lIGhlcmU8L3hhcDpDcmVhdG9yVG9vbD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPg0KICAgICAgPGRjOmZvcm1hdD5hcHBsaWNhdGlvbi9wZGY8L2RjOmZvcm1hdD4NCiAgICAgIDxkYzp0aXRsZT4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5BIHNpbXBsZSBQREYgMi4wIGV4YW1wbGUgZmlsZTwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOnRpdGxlPg0KICAgICAgPGRjOmNyZWF0b3I+DQogICAgICAgIDxyZGY6U2VxPg0KICAgICAgICAgIDxyZGY6bGk+RGF0YWxvZ2ljcyBJbmNvcnBvcmF0ZWQ8L3JkZjpsaT4NCiAgICAgICAgPC9yZGY6U2VxPg0KICAgICAgPC9kYzpjcmVhdG9yPg0KICAgICAgPGRjOmRlc2NyaXB0aW9uPg0KICAgICAgICA8cmRmOkFsdD4NCiAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkRlbW9uc3RyYXRpb24gb2YgYSBzaW1wbGUgUERGIDIuMCBmaWxlLjwvcmRmOmxpPg0KICAgICAgICA8L3JkZjpBbHQ+DQogICAgICA8L2RjOmRlc2NyaXB0aW9uPg0KICAgICAgPGRjOnJpZ2h0cz4NCiAgICAgICAgPHJkZjpBbHQ+DQogICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5Db3B5cmlnaHQgMjAxNyBQREYgQXNzb2NpYXRpb24uIExpY2Vuc2VkIHRvIHRoZSBwdWJsaWMgdW5kZXIgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1TaGFyZUFsaWtlIDQuMCBJbnRlcm5hdGlvbmFsIGxpY2Vuc2UuPC9yZGY6bGk+DQogICAgICAgIDwvcmRmOkFsdD4NCiAgICAgIDwvZGM6cmlnaHRzPg0KICAgIDwvcmRmOkRlc2NyaXB0aW9uPg0KICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhhcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iPg0KICAgICAgPHhhcFJpZ2h0czpNYXJrZWQ+VHJ1ZTwveGFwUmlnaHRzOk1hcmtlZD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIj4NCiAgICAgIDxjYzpsaWNlbnNlIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL3NhLzQuMC8iIC8+DQogICAgPC9yZGY6RGVzY3JpcHRpb24+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eGFwTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iPg0KICAgICAgPHhhcE1NOkRvY3VtZW50SUQ+dXVpZDozZWVmMjE2Ni04MzMyLWFiYjQtM2QzMS03NzMzNDU3ODg3M2Y8L3hhcE1NOkRvY3VtZW50SUQ+DQogICAgICA8eGFwTU06SW5zdGFuY2VJRD51dWlkOjk5MWJjY2U3LWVlNzAtMTFhMy05MWFhLTc3YmJlMjE4MWZkODwveGFwTU06SW5zdGFuY2VJRD4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgPC9yZGY6UkRGPg0KPC94OnhtcG1ldGE+DQplbmRzdHJlYW0NCmVuZG9iag0KDQozIDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZXMNCiAgL0tpZHMgWzQgMCBSXQ0KICAvQ291bnQgMQ0KPj4NCmVuZG9iag0KDQo0IDAgb2JqDQo8PA0KICAvVHlwZSAvUGFnZQ0KICAvUGFyZW50IDMgMCBSDQogIC9NZWRpYUJveCBbMCAwIDYxMiAzOTZdDQogIC9Db250ZW50cyBbNSAwIFIgNiAwIFJdDQogIC9SZXNvdXJjZXMgPDwNCiAgICAvRm9udCA8PCAvRjEgNyAwIFIgPj4NCiAgPj4NCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCA3NDQgPj4NCnN0cmVhbQ0KJSBTYXZlIHRoZSBjdXJyZW50IGdyYXBoaWMgc3RhdGUNCnEgDQoNCiUgRHJhdyBhIGJsYWNrIGxpbmUgc2VnbWVudCwgdXNpbmcgdGhlIGRlZmF1bHQgbGluZSB3aWR0aC4NCjE1MCAyNTAgbQ0KMTUwIDM1MCBsDQpTDQoNCiUgRHJhdyBhIHRoaWNrZXIsIGRhc2hlZCBsaW5lIHNlZ21lbnQuDQo0IHcgJSBTZXQgbGluZSB3aWR0aCB0byA0IHBvaW50cw0KWzQgNl0gMCBkICUgU2V0IGRhc2ggcGF0dGVybiB0byA0IHVuaXRzIG9uLCA2IHVuaXRzIG9mZg0KMTUwIDI1MCBtDQo0MDAgMjUwIGwNClMNCltdIDAgZCAlIFJlc2V0IGRhc2ggcGF0dGVybiB0byBhIHNvbGlkIGxpbmUNCjEgdyAlIFJlc2V0IGxpbmUgd2lkdGggdG8gMSB1bml0DQoNCiUgRHJhdyBhIHJlY3RhbmdsZSB3aXRoIGEgMS11bml0IHJlZCBib3JkZXIsIGZpbGxlZCB3aXRoIGxpZ2h0IGJsdWUuDQoxLjAgMC4wIDAuMCBSRyAlIFJlZCBmb3Igc3Ryb2tlIGNvbG9yDQowLjUgMC43NSAxLjAgcmcgJSBMaWdodCBibHVlIGZvciBmaWxsIGNvbG9yDQoyMDAgMzAwIDUwIDc1IHJlDQpCDQoNCiUgRHJhdyBhIGN1cnZlIGZpbGxlZCB3aXRoIGdyYXkgYW5kIHdpdGggYSBjb2xvcmVkIGJvcmRlci4NCjAuNSAwLjEgMC4yIFJHDQowLjcgZw0KMzAwIDMwMCBtDQozMDAgNDAwIDQwMCA0MDAgNDAwIDMwMCBjDQpiDQoNCiUgUmVzdG9yZSB0aGUgZ3JhcGhpYyBzdGF0ZSB0byB3aGF0IGl0IHdhcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoaXMgc3RyZWFtDQpRDQoNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8IC9MZW5ndGggMTY2ID4+DQpzdHJlYW0NCiUgQSB0ZXh0IGJsb2NrIHRoYXQgc2hvd3MgIkhlbGxvIFdvcmxkIg0KJSBObyBjb2xvciBpcyBzZXQsIHNvIHRoaXMgZGVmYXVsdHMgdG8gYmxhY2sgaW4gRGV2aWNlR3JheSBjb2xvcnNwYWNlDQpCVA0KICAvRjEgMjQgVGYNCiAgMTAwIDEwMCBUZA0KICAoSGVsbG8gV29ybGQpIFRqDQpFVA0KZW5kc3RyZWFtDQplbmRvYmoNCg0KNyAwIG9iag0KPDwNCiAgL1R5cGUgL0ZvbnQNCiAgL1N1YnR5cGUgL1R5cGUxDQogIC9CYXNlRm9udCAvSGVsdmV0aWNhDQogIC9GaXJzdENoYXIgMzMNCiAgL0xhc3RDaGFyIDEyNg0KICAvV2lkdGhzIDggMCBSDQogIC9Gb250RGVzY3JpcHRvciA5IDAgUg0KPj4NCmVuZG9iag0KDQo4IDAgb2JqDQpbIDI3OCAzNTUgNTU2IDU1NiA4ODkgNjY3IDIyMiAzMzMgMzMzIDM4OSA1ODQgMjc4IDMzMyAyNzggMjc4IDU1Ng0KICA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiA1NTYgNTU2IDU1NiAyNzggMjc4IDU4NCA1ODQgNTg0IDU1NiAxMDE1DQogIDY2NyA2NjcgNzIyIDcyMiA2NjcgNjExIDc3OCA3MjIgMjc4IDUwMCA2NjcgNTU2IDgzMyA3MjIgNzc4IDY2Nw0KICA3NzggNzIyIDY2NyA2MTEgNzIyIDY2NyA5NDQgNjY3IDY2NyA2MTEgMjc4IDI3OCAyNzggNDY5IDU1NiAyMjINCiAgNTU2IDU1NiA1MDAgNTU2IDU1NiAyNzggNTU2IDU1NiAyMjIgMjIyIDUwMCAyMjIgODMzIDU1NiA1NTYgNTU2DQogIDU1NiAzMzMgNTAwIDI3OCA1NTYgNTAwIDcyMiA1MDAgNTAwIDUwMCAzMzQgMjYwIDMzNCA1ODQgXQ0KZW5kb2JqDQoNCiUgVGhpcyBGb250RGVzY3JpcHRvciBjb250YWlucyBvbmx5IHRoZSByZXF1aXJlZCBlbnRyaWVzIGZvciBQREYgMi4wDQolIGZvciB1bmVtYmVkZGVkIHN0YW5kYXJkIDE0IGZvbnRzIHRoYXQgY29udGFpbiBMYXRpbiBjaGFyYWN0ZXJzDQo5IDAgb2JqDQo8PA0KICAvVHlwZSAvRm9udERlc2NyaXB0b3INCiAgL0ZvbnROYW1lIC9IZWx2ZXRpY2ENCiAgL0ZsYWdzIDMyDQogIC9Gb250QkJveCBbIC0xNjYgLTIyNSAxMDAwIDkzMSBdDQogIC9JdGFsaWNBbmdsZSAwDQogIC9Bc2NlbnQgNzE4DQogIC9EZXNjZW50IC0yMDcNCiAgL0NhcEhlaWdodCA3MTgNCiAgL1N0ZW1WIDg4DQogIC9NaXNzaW5nV2lkdGggMCAgDQo+Pg0KZW5kb2JqDQoNCiUgVGhlIG9iamVjdCBjcm9zcy1yZWZlcmVuY2UgdGFibGUuIFRoZSBmaXJzdCBlbnRyeQ0KJSBkZW5vdGVzIHRoZSBzdGFydCBvZiBQREYgZGF0YSBpbiB0aGlzIGZpbGUuDQp4cmVmDQowIDEwDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTIgMDAwMDAgbg0KMDAwMDAwMDA5MiAwMDAwMCBuDQowMDAwMDAyNTQzIDAwMDAwIG4NCjAwMDAwMDI2MTUgMDAwMDAgbg0KMDAwMDAwMjc3OCAwMDAwMCBuDQowMDAwMDAzNTgzIDAwMDAwIG4NCjAwMDAwMDM4MDcgMDAwMDAgbg0KMDAwMDAwMzk2OCAwMDAwMCBuDQowMDAwMDA0NTIwIDAwMDAwIG4NCnRyYWlsZXINCjw8DQogIC9TaXplIDEwDQogIC9Sb290IDEgMCBSDQogIC9JRCBbIDwzMWM3YThhMjY5ZTRjNTliYzNjZDdkZjBkYWJiZjM4OD48MzFjN2E4YTI2OWU0YzU5YmMzY2Q3ZGYwZGFiYmYzODg+IF0NCj4+DQpzdGFydHhyZWYNCjQ4NDcNCiUlRU9GDQo="
      }
    }],
    signatories: [
      {
        reference: "A"
      },
      {
        reference: "B"
      }
    ]
  }) {
    signatureOrder {
      id

      documents {
        id
      }
    }
  }
}
```

### Adding a signatory to a signature order

```
mutation {
  addSignatory(
    input: {
      signatureOrderId: "[signatureOrder.id]"
      reference: "..."
    }
  ) {
    signatory {
      href
    }
  }
}
```

### Scoped documents for a signatory

```
mutation {
  addSignatory(
    input: {
      signatureOrderId: "[signatureOrder.id]"
      documents: [
        {id: "[signatureOrder.documents[0].id]"}
      ]
    }
  ) {
    signatory {
      href
    }
  }
}
```

### Preapproved documents for a signatory

By preapproving documents for a signatory they are immediately sent to e-ID login to sign and skip the frontend approval flow.

When using preapproval document-scoping is automatically used so make sure that you pass all documents from the signature order to the signatory.

```
mutation {
  addSignatory(
    input: {
      signatureOrderId: "[signatureOrder.id]"
      documents: [
        {id: "[signatureOrder.documents[0].id]", preapproved: true}
        {id: "[signatureOrder.documents[1].id]", preapproved: true}
      ]
    }
  ) {
    signatory {
      href
    }
  }
}
```

### Evidence validation for signatories

Evidence validation keys must match what will be found in the claims token when signing. You can inspect JWT Tokens issued by Criipto Verify to see the necessary keys.

Evidence will be hashed before storage and compared when a user tries to sign. If the evidence does not match an error will be displayed to the user and they will be prompted to try again.

```
mutation {
  addSignatory(
    input: {
      signatureOrderId: "[signatureOrder.id]"
      evidenceValidation: [
        {key: "cprNumberIdentifier", value: "1234568888"}
      ]
    }
  ) {
    signatory {
      href
    }
  }
}
```

### Adding multiple signatories

```
mutation {
  addSignatories(
    input: {
      signatureOrderId: "[signatureOrder.id]"
      signatories: [
        {
          reference: "A"
        },
        {
          reference: "B"
        }
      ]
    }
  ) {
    signatureOrder {
      signatories {
        href
      }
    }

    signatories {
      href
    }
  }
}
```

### Query signature order
```
query {
  signatureOrder(id: "[signatureOrder.id]") {
    status
    signatories {
      status
      href
    }
  }
}
```

### Cancelling a signature order

If a signature order is no longer required you can cancel it.

```
mutation {
  cancelSignatureOrder(
    input: {
      signatureOrderId: "[signatureOrder.id]"
    }
  ) {
    signatureOrder {
      status
    }
  }
}
```

### Closing a signature order

Once all signatories have signed you need to close your signature order to retrieve the signed documents.

```
mutation {
  closeSignatureOrder(
    input: {
      signatureOrderId: "[signatureOrder.id]"
    }
  ) {
    signatureOrder {
      status

      documents {
        blob
      }
    }
  }
}
```

### Delete a signatory

If a signatory is currently pending but you no longer require them to sign, delete the signatory.

```
 mutation {
  deleteSignatory(
    input: {
      signatureOrderId: "[signatureOrder.id]"
      signatoryId: "[signatory.id]"
    }
  ) {
    signatureOrder {
      signatories {
        status
      }
    }
  }
}
```

### Query signatory
```
query {
  signatory(id: "[signatory.id]") {
    status
    signatureOrder {
      status
    }
  }
}
```

## Executing a query with variables

GraphQL queries are executed with HTTP POST requests. A `query` body parameter is required and a `variables` body parameter is optional but recommended.

Authentication to the Criipto Document Signatures GraphQL API uses Basic Auth over your Application Client Id and Client Secret.

```
curl -u clientId:clientSecret \
  -X POST --data '{"query": "query { signatureOrder(id: $id) { status }", "variables": {"id": "...example id ...."}}'
  https://signatures-api-prod.azurewebsites.net/v1/query
```

Our [GraphQL Explorer](https://signatures-api-prod.azurewebsites.net/v1/explorer) is the easiest way to test out queries.
